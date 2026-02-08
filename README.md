![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Graph Data Structure (with Optional Geometry)

Graphs are a powerful way to represent relationships among distinct items—whether you're mapping social networks, modeling routes, or understanding dependencies. This library supports graphs with **optional coordinates** for nodes and edges. When coordinates are provided, additional **geometric-based methods** become available for spatial operations and visualizations.

**Flexible Coordinate Support:**

- **Nodes** can optionally have `{ x, y }` coordinates describing their spatial location
- **Edges** can optionally specify `{ start: { x, y }, end: { x, y } }` coordinates for visual connections
- **Geometric methods** are automatically enabled when coordinates are present (specific requirements vary by method)
- **Non-geometric graphs** work perfectly without any coordinate data

This flexible design **streamlines** the creation, storage, and manipulation of both abstract and spatially-aware graphs, offering a suite of tools to effortlessly add, remove, traverse, or analyze them. Instead of building graph logic from scratch, you can rely on well-tested methods that handle everything from **validation** to **navigation**—whether you're working with pure logical relationships or spatially positioned data.

## 💡 Why Use This Library?

✅ **Flexible Geometry Support**: Works with or without coordinates—geometric methods automatically activate when coordinates are present.  
✅ **Fluent & Unified API**: Provides chainable methods for effortless creation, modification, and traversal.  
✅ **Rigorous Integrity**: Enforces unique, immutable identifiers and optional coordinate validation with robust error handling.  
✅ **Built-In Analysis & Serialization**: Offers integrated graph connectivity analysis and seamless JSON import/export.  
✅ **Customizable & Configurable**: Allows extended metadata and supports both immutable and in-place updates for tailored performance.

## 📦 Installation

```bash
npm install @scalable.software/graph
```

## 🛠️ Usage

This library supports both **geometric** and **non-geometric** graphs:

**For geometric graphs** (with spatial operations):

- **Nodes** can have optional `{ x, y }` coordinates describing their location
- **Edges** can have optional `{ start: { x, y }, end: { x, y } }` coordinates defining spatial connections
- **Geometric methods** (like `move`, `translate`, `project`) require all nodes/edges in the collection to have coordinates to operate
- **Graph-level spatial methods** (like `domain`, `extent`) work when any nodes have coordinates (filtering to only those with coordinates)

**For non-geometric graphs** (pure logical relationships):

- **Nodes** and **edges** work perfectly without any coordinate data
- All core graph operations (add, remove, find, traverse) remain fully functional
- Geometric methods like `move`, `translate`, `findByCoordinates`, `project` are available but will not operate when coordinates are missing (they return early without throwing errors)

### ✨ Creating a Geometric Graph

1. Define your graph data with **coordinates** for nodes and edges to enable geometric methods:

```typescript
let data = {
  metadata: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Clinical Pathway",
  },
  nodes: [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      coordinates: { x: 0, y: 0 },
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      coordinates: { x: 1, y: 1 },
    },
  ],
  edges: [
    {
      id: "123e4567-e89b-12d3-a456-426614174003",
      source: "123e4567-e89b-12d3-a456-426614174001",
      target: "123e4567-e89b-12d3-a456-426614174002",
      coordinates: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
    },
  ],
};
```

2. Import the `Graph` class and the `IGraph` interface:

```typescript
import { Graph, type IGraph } from "@scalable.software/graph";
```

3. Create a new graph instance:

```typescript
const graph = new Graph<IGraph>(data);
```

### ✨ Creating a Non-Geometric Graph

1. Define your graph data **without coordinates** for pure logical relationships:

```typescript
let data = {
  metadata: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Social Network",
  },
  nodes: [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Alice",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      name: "Bob",
    },
  ],
  edges: [
    {
      id: "123e4567-e89b-12d3-a456-426614174003",
      source: "123e4567-e89b-12d3-a456-426614174001",
      target: "123e4567-e89b-12d3-a456-426614174002",
    },
  ],
};
```

2. Import the `Graph` class and the `IGraph` interface:

```typescript
import { Graph, type IGraph } from "@scalable.software/graph";
```

3. Create a new graph instance:

```typescript
const graph = new Graph<IGraph>(data);
```

### 📥 Importing a Graph with Auto-Generated IDs

You can start with an **empty** graph and use the **`import()`** method to add data later. When IDs are omitted, the library automatically generates UUIDs for you.

**Geometric graph (with coordinates):**

1. Define your graph data with coordinates but without IDs:

```typescript
let data = {
  metadata: {
    name: "Clinical Pathway",
  },
  nodes: [
    {
      coordinates: { x: 0, y: 0 },
      name: "Registration",
    },
    {
      coordinates: { x: 5, y: 10 },
      name: "Triage",
    },
  ],
};
```

2. Create an empty graph and import the data:

```typescript
const graph = new Graph<IGraph>().import(data);
```

3. Retrieve the auto-generated node IDs by coordinates:

```typescript
const startNode = graph.nodes.findByCoordinates({ x: 0, y: 0 });
const endNode = graph.nodes.findByCoordinates({ x: 5, y: 10 });
```

4. Add an edge connecting the nodes:

```typescript
graph.edges.add({
  source: startNode.id,
  target: endNode.id,
  coordinates: {
    start: { x: 0, y: 0 },
    end: { x: 5, y: 10 },
  },
});
```

**Non-geometric graph (without coordinates):**

1. Define your graph data without coordinates or IDs:

```typescript
let data = {
  metadata: {
    name: "Social Network",
  },
  nodes: [
    { name: "Alice" },
    { name: "Bob" },
  ],
};
```

2. Create an empty graph and import the data:

```typescript
const graph = new Graph<IGraph>().import(data);
```

3. Retrieve the auto-generated node IDs by property:

```typescript
const alice = graph.nodes.find((node) => node.name === "Alice");
const bob = graph.nodes.find((node) => node.name === "Bob");
```

4. Add an edge connecting the nodes:

```typescript
graph.edges.add({
  source: alice.id,
  target: bob.id,
});
```

### 📤 Export & Serialize

Retrieve a JSON-like representation of your graph:

```typescript
const data = graph.export();
console.log(data);
```

> Note: graph.toJSON() is an alias for graph.export();

### 📍 Working with Geometry

Below is a short example showing how to **create** nodes with coordinates, **move** an existing node, **add** another node, and then **connect** them with an edge—demonstrating the library's geometry-first approach.

1. First, create a graph and add an initial node with coordinates:

```typescript
const graph = new Graph<IGraph>();
graph.nodes.add({
  id: "123e4567-e89b-12d3-a456-426614174000",
  coordinates: { x: 1, y: 1 },
});
```

2. Move the first node to (0,0):

```typescript
graph.nodes.move("123e4567-e89b-12d3-a456-426614174000", {
  x: 0,
  y: 0,
});
```

3. Add a second node at coordinates (5,5):

```typescript
graph.nodes.add({ coordinates: { x: 5, y: 5 } });
```

4. Retrieve the newly added node's ID:

```typescript
const { id } = graph.nodes.findByCoordinates({ x: 5, y: 5 });
```

5. Add an edge from the first node to the second node:

```typescript
graph.edges.add({
  source: "123e4567-e89b-12d3-a456-426614174000",
  target: id,
  coordinates: {
    start: { x: 0, y: 0 },
    end: { x: 5, y: 5 },
  },
});
```

### 🔗 Fluent Metadata Modification

You can also **chain** methods, for example the metadata operations to update, remove, or add fields:

```typescript
graph.metadata
  .update({ name: "New Graph Name", custom: "custom" })
  .remove(["custom"])
  .update({ type: "pathway" });
```

---

**Tip**: These coordinate-based APIs make it simple to integrate with **visual** or **layout** libraries. Because each node and edge tracks its position in 2D space, you can easily render dynamic diagrams, flowcharts, or route maps with accurate geometry.

Graphs are a powerful way to represent relationships among distinct items—whether you're mapping social networks, modeling routes, or understanding dependencies. Nodes serve as individual entities, and edges capture the connections between them, forming a dynamic data structure that mirrors real-world complexity.

This graph library streamlines the creation, storage, and manipulation of those connections, offering a suite of tools to effortlessly add, remove, traverse, or analyze nodes and edges. Instead of building graph logic from scratch, you can rely on well-tested methods that handle everything from validation to navigation—letting you focus on extracting insights and delivering value from connected data.

### 🔄 Custom Graph Example

This library is ideal for modeling clinical pathways containing different actors and paths connecting the actors. The following example uses a minimal set of custom types and demonstrates how to instantiate a typed graph with:

- A `start` actor

- A `workflow` actor (with metadata)

- A connecting `path`

1. Define Custom Types (`pathway.types.ts`)

```typescript
import type { IMetadata, INode, IEdge, IGraph } from "@scalable.software/graph";

export type PathwayMetadata = IMetadata & {
  type: string;
};

export type IActor = INode & {
  name: string;
  type: "start" | "workflow";
  icon: string;
  metadata?: any[];
};

export type IPath = IEdge & {
  name: string;
};

export type IPathway = IGraph & {
  metadata: PathwayMetadata;
  nodes: IActor[];
  edges: IPath[];
};
```

2. Create a Typed Pathway Instance

```typescript
import { Graph } from "@scalable.software/graph";
import type { IPathway } from "./pathway.types.js";

const data: IPathway = {
  metadata: {
    id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
    name: "ACS Diagnostic",
    type: "pathway",
  },
  nodes: [
    {
      id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
      name: "Start",
      type: "start",
      icon: "start.svg",
      coordinates: { x: 0, y: 6 },
    },
    {
      id: "f42ffd29-38ad-488b-b826-bbcadf9043c2",
      name: "Triage",
      type: "workflow",
      icon: "workflow.svg",
      coordinates: { x: 2, y: 6 },
      metadata: [
        {
          duration: {
            distribution: "log normal",
            parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
          },
        },
      ],
    },
  ],
  edges: [
    {
      id: "6b15e892-d6cd-482a-8cfb-3268a1a4eac1",
      name: "",
      source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
      target: "f42ffd29-38ad-488b-b826-bbcadf9043c2",
      coordinates: {
        start: { x: 0, y: 6 },
        end: { x: 2, y: 6 },
      },
    },
  ],
};
```

3. Instantiate and Use the Graph

```typescript
const pathway = new Graph<IPathway>(data);

console.log(pathway.metadata.name); // "ACS Diagnostic"
console.log(pathway.nodes.length); // 2
console.log(pathway.edges.length); // 1
```

4. Export the Graph

```typescript
const snapshot = pathway.export();
```

This example shows how to model typed actors and directional paths within a spatially aware, validated graph structure—making it ideal for visualization, simulation, or rule-based execution engines.

## 📖 API Reference

For complete API documentation, see **[API.md](./API.md)**

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA-4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> - Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
> - NonCommercial: You may not use this material for commercial purposes.
> - ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.

For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
