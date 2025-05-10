import Shot from "./Shot";

export interface Session {
  name: string;
  date: string;
  shots: Shot[];
}
