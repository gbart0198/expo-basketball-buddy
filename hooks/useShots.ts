import { useEffect, useState } from "react";
import ShotSummary from "@/models/ShotSummary";
import { ShotService } from "@/services/shotService";

export function useShotSummaries(sessionId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [shots, setShots] = useState<ShotSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      loadShots(sessionId);
    }
  }, [sessionId]);

  const loadShots = async (sessionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ShotService.listShots(sessionId);
      if (response && response.length > 0) {
        setShots(response);
      } else {
        console.log("No shot data found");
        throw new Error("No shot data found");
      }
    } catch (error) {
      console.error("Error fetching shots:", error);
      setError("Failed to load shots");
    } finally {
      setIsLoading(false);
    }
  };

  const addShot = async (sessionId: string, shot: ShotSummary) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ShotService.addShot(sessionId, shot);
      if (response && response.id) {
        setShots((prevShots) => [...prevShots, response]);
      } else {
        console.log("Failed to add shot");
        throw new Error("Failed to add shot");
      }
    } catch (error) {
      console.error("Error adding shot:", error);
      setError("Failed to add shot");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteShot = async (sessionId: string, shotId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await ShotService.deleteShot(sessionId, shotId);
      setShots((prevShots) => prevShots.filter((shot) => shot.id !== shotId));
    } catch (error) {
      console.error("Error deleting shot:", error);
      setError("Failed to delete shot");
    } finally {
      setIsLoading(false);
    }
  };

  const updateShot = async (
    sessionId: string,
    shotId: string,
    shot: ShotSummary,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ShotService.updateShot(sessionId, shotId, shot);
      if (response) {
        setShots((prevShots) =>
          prevShots.map((s) => (s.id === shotId ? response : s)),
        );
      } else {
        console.log("Failed to update shot");
        throw new Error("Failed to update shot");
      }
    } catch (error) {
      console.error("Error updating shot:", error);
      setError("Failed to update shot");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    shots,
    loadShots,
    addShot,
    deleteShot,
    updateShot,
    isLoading,
    error,
  };
}
