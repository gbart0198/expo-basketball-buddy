// zones.ts
//

export function getZoneForPoint(x: number, y: number): Zone | null {
  for (const zone of COURT_ZONES) {
    if (
      x >= zone.bounds.x1 &&
      x <= zone.bounds.x2 &&
      y >= zone.bounds.y1 &&
      y <= zone.bounds.y2
    ) {
      return zone;
    }
  }
  return null;
}

export type Zone = {
  id: number;
  name: string;
  bounds: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
};

export const COURT_ZONES: Zone[] = [
  { id: 1, name: "Zone 1", bounds: { x1: 0.0, y1: 0.0, x2: 0.2, y2: 0.275 } },
  { id: 2, name: "Zone 2", bounds: { x1: 0.2, y1: 0.0, x2: 0.4, y2: 0.275 } },
  { id: 3, name: "Zone 3", bounds: { x1: 0.4, y1: 0.0, x2: 0.6, y2: 0.275 } },
  { id: 4, name: "Zone 4", bounds: { x1: 0.6, y1: 0.0, x2: 0.8, y2: 0.275 } },
  { id: 5, name: "Zone 5", bounds: { x1: 0.8, y1: 0.0, x2: 1.0, y2: 0.275 } },

  { id: 6, name: "Zone 6", bounds: { x1: 0.4, y1: 0.275, x2: 0.6, y2: 0.515 } },
  { id: 7, name: "Zone 7", bounds: { x1: 0.6, y1: 0.275, x2: 0.8, y2: 0.515 } },
  { id: 8, name: "Zone 8", bounds: { x1: 0.2, y1: 0.275, x2: 0.4, y2: 0.515 } },
  { id: 9, name: "Zone 9", bounds: { x1: 0.4, y1: 0.515, x2: 0.6, y2: 0.65 } },
  {
    id: 10,
    name: "Zone 10",
    bounds: { x1: 0.8, y1: 0.275, x2: 1.0, y2: 0.515 },
  },
  {
    id: 11,
    name: "Zone 11",
    bounds: { x1: 0.6, y1: 0.515, x2: 0.8, y2: 0.65 },
  },
  { id: 12, name: "Zone 12", bounds: { x1: 0.6, y1: 0.65, x2: 1.0, y2: 0.77 } },
  {
    id: 13,
    name: "Zone 13",
    bounds: { x1: 0.8, y1: 0.515, x2: 1.0, y2: 0.65 },
  },

  {
    id: 14,
    name: "Zone 14",
    bounds: { x1: 0.0, y1: 0.275, x2: 0.2, y2: 0.515 },
  },
  {
    id: 15,
    name: "Zone 15",
    bounds: { x1: 0.2, y1: 0.515, x2: 0.4, y2: 0.65 },
  },
  {
    id: 16,
    name: "Zone 16",
    bounds: { x1: 0.0, y1: 0.515, x2: 0.2, y2: 0.65 },
  },
  { id: 17, name: "Zone 17", bounds: { x1: 0.0, y1: 0.65, x2: 0.4, y2: 0.77 } },

  { id: 18, name: "Zone 18", bounds: { x1: 0.4, y1: 0.65, x2: 0.6, y2: 0.77 } },

  { id: 19, name: "Zone 19", bounds: { x1: 0.0, y1: 0.77, x2: 1.0, y2: 1.0 } },
];
