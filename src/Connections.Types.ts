import { type UUID } from "./Utilities/Utilities.js";

import { Coordinates } from "./Graph.Types.js";

export type Connection = {
  id?: UUID;
  name: string;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};
