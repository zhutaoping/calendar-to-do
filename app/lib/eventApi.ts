import axios from "axios";
import { Event } from "@prisma/client";

export async function getEvents() {
  const res = await axios.get("/api/events");
  return res.data;
}

export default async function addEvent(data: Partial<Event>) {
  try {
    const res = await axios.post("/api/events", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
