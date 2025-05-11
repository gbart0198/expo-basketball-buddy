import ShotSummary from "./ShotSummary";

export interface Session {
    id: string;
    name: string;
    date: string;
    shots: ShotSummary[];
}
