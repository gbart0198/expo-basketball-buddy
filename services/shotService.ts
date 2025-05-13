import ShotSummary from "@/models/ShotSummary";

export const ShotService = {
  listShots: (sessionId: string): Promise<ShotSummary[]> => {},
  addShot(sessionId: string, shotData: any): Promise<ShotSummary> {},

  deleteShot(sessionId: string, shotId: string): Promise<void> {},

  updateShot(
    sessionId: string,
    shotId: string,
    shotData: any,
  ): Promise<ShotSummary> {},

  getShot(sessionId: string, shotId: string): Promise<ShotSummary> {},
};
