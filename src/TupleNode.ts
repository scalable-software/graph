import { Utilities } from "./Utilities/Utilities.js";
import { TupleNodeType } from "./TupleNode.meta.js";
import { Icon, StructureType, Metadata } from "./Node.js";

export class TupleNode {
  public static structure: StructureType = "tuple";
  public static create = ({ name, type, coordinates, icon }): TupleNodeType => [
    Utilities.uuid,
    name,
    type,
    [coordinates.x, coordinates.y],
    icon,
  ];

  public static addMetadata = (
    node: TupleNodeType,
    metadata: Metadata
  ): TupleNodeType => {
    node[5] = Array.isArray(node[5]) ? [...node[5], metadata] : [metadata];
    return node;
  };

  public static updateMetadata = (
    node: TupleNodeType,
    metadata: Metadata
  ): TupleNodeType => {
    let key = Object.keys(metadata)[0];
    node[5] = node[5].map((node) => (node[key] ? metadata : node));
    return node;
  };

  public static updateCoordinates = (
    node: TupleNodeType,
    coordinates
  ): TupleNodeType => {
    node[3] = [coordinates.x, coordinates.y];
    return node;
  };

  public static updateIcon = (
    node: TupleNodeType,
    icon: Icon
  ): TupleNodeType => {
    node[4] = icon;
    return node;
  };

  public static update = (
    node: TupleNodeType,
    update: TupleNodeType
  ): TupleNodeType => update;

  public static removeMetadata = (node: TupleNodeType, type): TupleNodeType => {
    node[5] = node[5].filter((metadata) => metadata[type] === undefined);
    return node;
  };

  public static translate = (node: TupleNodeType, offset: any) => {
    node[3] = [node[3][0] + offset.x, node[3][0] + offset.y];
    return node;
  };
}
