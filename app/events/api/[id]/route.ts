import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
  res: Response
) {
  console.log("🚀 ~ id:", id);

  // const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(event);
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } },
  res: Response
) {
  if (!id) return NextResponse.json({ message: "No id provided" });

  const deletedEvent = await prisma.event.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({
    message: "Event deleted successfully",
    data: deletedEvent,
  });
}
