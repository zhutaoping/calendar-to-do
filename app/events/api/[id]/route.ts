import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
  res: Response
) {
  // const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(event);
}
