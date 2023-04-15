import axios from "axios";
import { Event } from "@prisma/client";

export async function getEvents() {
  const res = await axios.get("/events/api");
  return res.data;
}

export default async function addEvent(event: Partial<Event>) {
  const res = await axios.post("/events/api", event);
  return res.data;
}

export async function updateEvent(event: Partial<Event>) {
  const res = await axios.patch(`/events/api/`, event);
  return res.data; // from NextResponse
}

export async function deleteEvent(id: string) {
  const res = await axios.delete(`/events/api`, {
    data: {
      id,
    },
  });
  return res.data; // from NextResponse
}
