import { Event } from "@prisma/client";

export async function getEvents() {
  const res = await fetch("/events/api");
  return res.json(); // from NextResponse
}

export default async function addEvent(event: Partial<Event>) {
  const res = await fetch("/events/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return res.json(); // from NextResponse
}

export async function updateEvent(event: Partial<Event>) {
  const res = await fetch(`/events/api/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return res.json(); // from NextResponse
}

export async function deleteEvent(id: string) {
  const res = await fetch(`/events/api`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json(); // from NextResponse
}
