import { UUID } from "./Utilities/Utilities.js";

/**
{
  "id": "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
  "name": "",
  "source": "35c6779a-fd9d-4089-d1ab-af0b932fc912",
  "target": "15b6679a-fd9d-4036-b1ab-af0b932fc903",
  "coordinates": {
    "start": { "x": 0, "y": 400 },
    "end": { "x": 100, "y": 400 }
  }
}
*/

export type Coordinates = {
  x: number;
  y: number;
};

export type Connection = {
  id: UUID;
  name: string;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};

export type Connections = Connection[];
