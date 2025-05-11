export default interface ShotSummary {
    id: string;
    sessionId: string;
    x: number;
    y: number;
    attempts: number;
    makes: number;
    last_shot_at: string;
}
