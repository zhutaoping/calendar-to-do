import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { Event } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  let events: Event[] = []
  if (!session) {
    events = await prisma.event.findMany({
      where: {
        userId: null,
      },
    })
  } else {
    events = await prisma.event.findMany({
      where: {
        userId: session.user.id,
      },
    })
  }
  return NextResponse.json(events)
}

export async function POST(req: Request, res: Response) {
  const event: Event = await req.json()

  const newEvent = await prisma.event.create({
    data: {
      ...event,
    },
  })

  return NextResponse.json(newEvent)
}

export async function PATCH(req: Request, res: Response) {
  const event: Event = await req.json()

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
  })

  return NextResponse.json(updatedEvent)
}
