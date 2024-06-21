import { Utilities } from "./Utilities/Utilities.js";

import {
  Icon,
  StructureType,
  Metadata,
  Node as iNode,
  Coordinates as Coordinates,
} from "./Node.meta.js";

export class Node {
  public static create = ({ name, type, coordinates, icon }): iNode => ({
    id: Utilities.uuid,
    name,
    type,
    coordinates,
    icon,
  });

  public static addMetadata = (node: iNode, metadata: Metadata): iNode => ({
    ...node,
    metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
  });

  public static update = (node: iNode, update: iNode): iNode => update;

  public static updateMetadata = (node: iNode, metadata: Metadata): iNode => {
    let key = Object.keys(metadata)[0];
    node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
    return node;
  };

  public static updateCoordinates = (
    node: iNode,
    coordinates: Coordinates
  ): iNode => ({
    ...node,
    coordinates,
  });

  public static updateIcon = (node: iNode, icon: Icon): iNode => ({
    ...node,
    icon,
  });

  public static removeMetadata = (node: iNode, type: string): iNode => {
    node.metadata = node.metadata.filter(
      (metadata) => metadata[type] === undefined
    );
    return node;
  };

  public static translate = (node: iNode, offset: any) => {
    node.coordinates = {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    };
    return node;
  };
}
