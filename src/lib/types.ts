export type Role = "admin" | "user";

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface Timeslot {
  id: number;
  start_time: string;
  end: string;
  available: boolean;
  user?: User;
}

export interface Day {
  date: string;
  timeslots: Timeslot[];
}
