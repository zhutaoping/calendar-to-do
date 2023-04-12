import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Event } from "@prisma/client";

export async function GET() {
  const allEvents = await prisma.event.findMany();

  return NextResponse.json(allEvents);
}

export async function POST(req: Request, res: Response) {
  const { title, startTime, endTime, year, month, day }: Event =
    await req.json();

  if (!title || !startTime || !endTime || !year || !month || !day) {
    return NextResponse.json({ message: "Missing required data" });
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        startTime,
        endTime,
        year,
        month,
        day,
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
