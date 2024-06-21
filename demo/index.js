import { Graph } from "graph";
console.log(`Import module: Graph`);

console.log(`Define node details`);
let details = {
  name: "Node",
  type: "start",
  coordinates: { x: 0, y: 0 },
  icon: "./icon.svg",
};

console.log(details);
let node = Graph.createNode(details);

console.log("Create node using static function: Graph.createNode(details)");
console.log(node);
