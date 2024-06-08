import { Utilities } from "./Utilities/Utilities.js";

import { Metadata } from "./Metadata.js";

import { TupleNode, Icon } from "./TupleType.meta.js";

export class TupleType {
  public static structure = "tuple";
  public static create = ({ name, type, coordinates, icon }): TupleNode => [
    Utilities.uuid,
    name,
    type,
    [coordinates.x, coordinates.y],
    icon,
  ];

  public static addMetadata = (
    node: TupleNode,
    metadata: Metadata
  ): TupleNode => {
    node[5] = Array.isArray(node[5]) ? [...node[5], metadata] : [metadata];
    return node;
  };

  public static updateMetadata = (
    node: TupleNode,
    metadata: Metadata
  ): TupleNode => {
    let key = Object.keys(metadata)[0];
    node[5] = node[5].map((node) => (node[key] ? metadata : node));
    return node;
  };

  public static updateCoordinates = (
    node: TupleNode,
    coordinates
  ): TupleNode => {
    node[3] = [coordinates.x, coordinates.y];
    return node;
  };

  public static updateIcon = (node: TupleNode, icon: Icon): TupleNode => {
    node[4] = icon;
    return node;
  };

  public static update = (node: TupleNode, update: TupleNode): TupleNode =>
    update;

  public static removeMetadata = (node: TupleNode, type): TupleNode => {
    node[5] = node[5].filter((metadata) => metadata[type] === undefined);
    return node;
  };

  public static translate = (node: TupleNode, offset: any) => {
    node[3] = [node[3][0] + offset.x, node[3][0] + offset.y];
    return node;
  };
}
