import { Utilities } from "./Utilities/Utilities.js";
import { Metadata } from "./Metadata.js";

import { ObjectNode, ObjectCoordinates, Icon } from "./ObjectType.meta.js";

export class ObjectType {
  public static structure = "object";
  public static create = ({ name, type, coordinates, icon }): ObjectNode => ({
    id: Utilities.uuid,
    name,
    type,
    coordinates,
    icon,
  });

  public static addMetadata = (
    node: ObjectNode,
    metadata: Metadata
  ): ObjectNode => ({
    ...node,
    metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
  });

  public static update = (node: ObjectNode, update: ObjectNode): ObjectNode =>
    update;

  public static updateMetadata = (
    node: ObjectNode,
    metadata: Metadata
  ): ObjectNode => {
    let key = Object.keys(metadata)[0];
    node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
    return node;
  };

  public static updateCoordinates = (
    node: ObjectNode,
    coordinates: ObjectCoordinates
  ): ObjectNode => ({
    ...node,
    coordinates,
  });

  public static updateIcon = (node: ObjectNode, icon: Icon): ObjectNode => ({
    ...node,
    icon,
  });

  public static removeMetadata = (
    node: ObjectNode,
    type: string
  ): ObjectNode => {
    node.metadata = node.metadata.filter(
      (metadata) => metadata[type] === undefined
    );
    return node;
  };

  public static translate = (node: ObjectNode, offset: any) => {
    node.coordinates = {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    };
    return node;
  };
}
