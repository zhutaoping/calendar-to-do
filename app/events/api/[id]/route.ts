import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";

export async function GET(
  req: Request,
  res: Response
  // { params: { id } }: { params: { id: string } }
) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(event);
}

export async function PATCH(req: Request, res: Response) {
  const event: Event = await req.json();

  const updatedEvent = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      ...event,
    },
  });

  return NextResponse.json({
    message: "Event updated successfully",
    data: updatedEvent,
  });
}
