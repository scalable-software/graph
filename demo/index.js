import { Graph } from "@scalable-software/graph.structure";

const graph = new Graph({ name: "Graph", type: "clinical pathway" });

graph.nodes.add({
  name: "Node",
  type: "start",
  coordinates: { x: 0, y: 0 },
  icon: "./icon.svg",
});

console.log(graph.nodes[0]);
