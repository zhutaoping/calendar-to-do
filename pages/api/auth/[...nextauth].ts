import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password!
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // means user just logged in
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          // id: u.id,
        };
      }
      // console.log("token: ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        };
      }
      return session;
    },
  },
  session: {
    //! database is disabled here by next-auth!?
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex");
    // },
  },
  // jwt: {
  //   // for signing tokens
  //   secret: process.env.NEXTAUTH_JWT_SECRET,
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
