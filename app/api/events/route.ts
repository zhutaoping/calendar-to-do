import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";

export async function GET() {
  const allEvents = await prisma.event.findMany();

  return NextResponse.json(allEvents);
}

export async function POST(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}
