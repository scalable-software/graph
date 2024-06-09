import { UUID } from "./Utilities/Utilities.js";

/** 
[
  "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
  "",
  "35c6779a-fd9d-4089-d1ab-af0b932fc912",
  "15b6679a-fd9d-4036-b1ab-af0b932fc903",
  [ 
    [ 0, 400 ],
    [ 100, 400 ]
  ]
]
*/

export type TupleCoordinates = [number, number];
export type TupleConnectionType = [
  UUID,
  string,
  UUID,
  UUID,
  [TupleCoordinates, TupleCoordinates]
];
