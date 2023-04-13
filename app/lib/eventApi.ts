import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function getEvents() {
  const res = await axios.get("/api/events");
  return res.data;
}

export default async function addEvent(data: Event) {
  const res = await axios.post("/api/events", data);
  return res.data;
}
