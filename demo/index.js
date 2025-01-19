import { Graph } from "@scalable-software/graph";

const graph = new Graph({ name: "Graph", type: "clinical pathway" });

graph.nodes.create({
  name: "Node",
  type: "start",
  coordinates: { x: 0, y: 0 },
  icon: "./icon.svg",
});

console.log(graph.nodes[0]);
