import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) {
    return NextResponse.redirect("/login");
  }

  console.log("users", users);

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
    return NextResponse.json({
      message: "User already exists",
    });
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
    return NextResponse.json({
      message: "User created successfully",
      data: newUser,
    });
  } else {
    return NextResponse.json({
      message: "Invalid user data",
    });
  }
}

export async function DELETE(req: Request, res: Response) {
  const { id } = await req.json();

  if (!id) return NextResponse.json({ message: "No id provided" });

  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({
    message: "User deleted successfully",
    data: deletedUser,
  });
}
