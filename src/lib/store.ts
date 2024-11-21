import { writable } from "svelte/store";
import type { Day, Timeslot } from "./types";

const generateTimeslots = (
  startTime: string,
  endTime: string,
  interval: number,
): Timeslot[] => {
  const timeslots: Timeslot[] = [];
  let current = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  let id = 1;
  while (current < end) {
    const start_time = current.toTimeString().substring(0, 5); // Format: HH:mm
    current.setMinutes(current.getMinutes() + interval);
    const end_time = current.toTimeString().substring(0, 5); // Format: HH:mm

    timeslots.push({
      id: id++,
      start_time,
      end: end_time,
      available: true, // Default to available
    });
  }
  return timeslots;
};

// Create a writable store for a `Day` object
export const dayStore = writable<Day>({
  date: new Date().toISOString().split("T")[0], // Today's date
  timeslots: generateTimeslots("09:00", "15:00", 20),
});
