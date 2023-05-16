import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { mailOptions } from "@/app/lib/nodemailer";
import { transporter } from "@/app/lib/nodemailer";

export async function GET() {
  return NextResponse.json("password reset");
}

export async function POST(req: Request, res: Response) {
  const { email } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return new NextResponse(
      JSON.stringify({
        message: "Email not found. Please try again.",
      }),
      {
        status: 400,
      }
    );
  }

  const securedTokenId = nanoid(32); // create a secure reset password token

  const newToken = await prisma.token.create({
    data: {
      token: securedTokenId,
      userId: existingUser.id,
      type: "RESET_PASSWORD",
      expires: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes
    },
  });

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "Calendar-To-Do App Password Reset",
      html: `
      <div>
      <h2>Hello, ${existingUser.name}</h2>
     
      </div>
      `,
    });
  } catch (error) {
    console.log("error: ", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong. Please try again.",
      }),
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(newToken);
}

//* RESET PASSWORD
export async function PATCH(req: Request, res: Response) {
  const data = await req.json();
  console.log("🚀 ~ PATCH ~ data:", data);

  const deletedToken = await prisma.token.delete({
    where: { id: data.id },
  });
  console.log("🚀 ~ PATCH ~ deletedToken:", deletedToken);

  if (!deletedToken) {
    return new NextResponse(
      JSON.stringify({
        status: 403,
      })
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const updatedUser = await prisma.user.update({
    where: { id: deletedToken.userId },
    data: { password: hashedPassword },
  });

  return NextResponse.json(updatedUser);
}
