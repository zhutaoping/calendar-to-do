import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) {
    return NextResponse.json({
      message: "No users found",
    });
  }
  return NextResponse.json(users);
}

export async function POST(req: Request, res: Response) {
  const { name, email, password } = await req.json();

  if (req.method !== "POST") {
    return NextResponse.json({
      message: "Invalid request method",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: "User already exists" }),
      {
        status: 409,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    return NextResponse.json(newUser);
  } else {
    return NextResponse.json({
      message: "Invalid user data",
    });
  }
}
