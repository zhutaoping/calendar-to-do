import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ GET ~ session:", session);

  let events: Event[] = [];
  if (!session) {
    events = await prisma.event.findMany({
      where: {
        userId: null,
      },
    });
  } else {
    events = await prisma.event.findMany({
      where: {
        userId: session.user.id,
      },
    });
  }
  console.log("🚀 ~ GET ~ events:", events);

  return NextResponse.json(events);
}

export async function POST(req: Request, res: Response) {
  const event: Event = await req.json();
  console.log("🚀 ~ POST ~ event:", event);

  const newEvent = await prisma.event.create({
    data: {
      ...event,
    },
  });

  return NextResponse.json(newEvent);
}

export async function PATCH(req: Request, res: Response) {
  const event: Event = await req.json();

  const updatedEvent = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      completed: event.completed,
    },
  });

  return NextResponse.json(updatedEvent);
}

export async function DELETE(req: Request, res: Response) {
  const { id } = await req.json();

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
