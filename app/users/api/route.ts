import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
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
  const user: User = await req.json();

  const newUser = await prisma.user.create({
    data: {
      ...user,
    },
  });

  return NextResponse.json({
    message: "User created successfully",
    data: newUser,
  });
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
