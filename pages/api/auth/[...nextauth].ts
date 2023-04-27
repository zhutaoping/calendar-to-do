import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";

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
        console.log("Authenticated user: ", user);
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // means user just logged in)
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // "database" is the default
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET, // for signing tokens
  // },
  // secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
