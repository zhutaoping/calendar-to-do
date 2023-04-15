import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";

export async function PATCH(req: Request, res: Response) {
  const { id }: { id: string } = await req.json();
  console.log(id);
}
