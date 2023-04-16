import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";

export async function GET() {
  const allEvents = await prisma.event.findMany();

  return NextResponse.json(allEvents);
}

export async function POST(req: Request, res: Response) {
  const event: Event = await req.json();

  const newEvent = await prisma.event.create({
    data: {
      ...event,
    },
  });

  return NextResponse.json({
    message: "Event created successfully",
    data: newEvent,
  });
}

export async function PATCH(req: Request, res: Response) {
  const event: Event = await req.json();

  const updatedEvent = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      completed: event.completed,
    },
  });

  return NextResponse.json({
    message: "Event updated successfully",
    data: updatedEvent,
  });
}

export async function DELETE(req: Request, res: Response) {
  const { id } = await req.json();

  if (!id) return NextResponse.json({ message: "No id provided" }); // return to axios(res)

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
