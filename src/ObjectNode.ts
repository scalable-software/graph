import { Utilities } from "./Utilities/Utilities.js";
import { Icon, StructureType, Metadata } from "./Node.js";

import { ObjectNodeType, ObjectCoordinates } from "./ObjectNode.meta.js";

export class ObjectNode {
  public static structure: StructureType = "object";
  public static create = ({
    name,
    type,
    coordinates,
    icon,
  }): ObjectNodeType => ({
    id: Utilities.uuid,
    name,
    type,
    coordinates,
    icon,
  });

  public static getStartNode = (nodes: ObjectNodeType[]): ObjectNodeType => 
     nodes.find((node) => node.type === "start");
  
  public static addMetadata = (
    node: ObjectNodeType,
    metadata: Metadata
  ): ObjectNodeType => ({
    ...node,
    metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
  });

  public static update = (
    node: ObjectNodeType,
    update: ObjectNodeType
  ): ObjectNodeType => update;

  public static updateMetadata = (
    node: ObjectNodeType,
    metadata: Metadata
  ): ObjectNodeType => {
    let key = Object.keys(metadata)[0];
    node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
    return node;
  };

  public static updateCoordinates = (
    node: ObjectNodeType,
    coordinates: ObjectCoordinates
  ): ObjectNodeType => ({
    ...node,
    coordinates,
  });

  public static updateIcon = (
    node: ObjectNodeType,
    icon: Icon
  ): ObjectNodeType => ({
    ...node,
    icon,
  });

  public static removeMetadata = (
    node: ObjectNodeType,
    type: string
  ): ObjectNodeType => {
    node.metadata = node.metadata.filter(
      (metadata) => metadata[type] === undefined
    );
    return node;
  };

  public static translate = (node: ObjectNodeType, offset: any) => {
    node.coordinates = {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    };
    return node;
  };
}
