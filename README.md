![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Graph Data Structure (with Geometry)

Graphs are a powerful way to represent relationships among distinct items—whether you're mapping social networks, modeling routes, or understanding dependencies. In this library, **both nodes and edges require coordinates**, giving the entire graph a strong **geometric foundation**. Each node has `(x, y)` coordinates, while edges track start and end points—making it easy to visualize, render, and position connected data in 2D space.

This geometry-oriented design **streamlines** the creation, storage, and manipulation of nodes and edges, offering a suite of tools to effortlessly add, remove, traverse, or analyze them. Instead of building graph logic from scratch, you can rely on well-tested methods that handle everything from **validation** to **navigation**—letting you focus on delivering insights and value from connected data with clear spatial relationships.

## 💡 Why Use This Library?

✅ Geometry-Driven: Requires coordinates for nodes and edges to enable precise spatial visualizations.  
✅ Fluent & Unified API: Provides chainable methods for effortless creation, modification, and traversal.  
✅ Rigorous Integrity: Enforces unique, immutable identifiers and strict coordinate validation with robust error handling.  
✅ Built-In Analysis & Serialization: Offers integrated graph connectivity analysis and seamless JSON import/export.  
✅ Customizable & Configurable: Allows extended metadata and supports both immutable and in-place updates for tailored performance.

## 📦 Installation

```bash
npm install @scalable.software/graph
```

## 🛠️ Usage

This library is **geometry-first**, requiring **coordinates** for both nodes and edges:

- **Nodes** have `{ x, y }` coordinates describing their location.
- **Edges** specify `{ start: { x, y }, end: { x, y } }` to define how they connect in 2D space.

### ✨ Creating a Graph

1. Define your graph data with **coordinates** for nodes and edges:

```typescript
let data = {
  metadata: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Clinical Pathway",
  },
  nodes: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      coordinates: { x: 0, y: 0 },
    },
  ],
  edges: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
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

### 📥 Importing a Graph

You can also start with an **empty** graph and **import** data (with coordinates) later:

```typescript
let data = {
  metadata: {
    name: "Clinical Pathway",
  },
  nodes: [
    {
      coordinates: { x: 5, y: 10 },
    },
  ],
};

const graph = new Graph<IGraph>().import(data);
```

### 📤 Export & Serialize

Retrieve a JSON-like representation of your graph:

```typescript
const data = graph.export();
console.log(data);
```

> Note: graph.toJSON() is an alias for graph.export();

### 📍 Working with Geometry

Below is a short example showing how to **move** an existing node, **add** another node, and then **connect** them with an edge—demonstrating the library’s geometry-first approach.

1. Move the first node (id "123e4567-e89b-12d3-a456-426614174000") to (0,0):

```typescript
graph.nodes.move("123e4567-e89b-12d3-a456-426614174000", { x: 0, y: 0 });
```

2. Add a second node at coordinates (5,5):

```typescript
graph.nodes.add({ coordinates: { x: 5, y: 5 } });
```

3. Retrieve the newly added node's ID (assuming it's in position 1 of the array)

```typescript
const { id } = graph.nodes.findByCoordinates({ x: 5, y: 5 });
```

4. Add an edge from the first node to the second node:

```typescript
graph.edges.add({
  source: "123e4567-e89b-12d3-a456-426614174000",
  target: "123e4567-e89b-12d3-a456-426614174001",
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

## 🚀 Features

✅ **Comprehensive Graph Structure** – Manage nodes, edges, and metadata through a unified API.  
✅ **Fluent API** – Chainable, expressive method calls (e.g., `nodes.add(...).update(...).remove(...)`).  
✅ **Immutable & Validated Identifiers** – Nodes, edges, and metadata all enforce consistent UUIDs.  
✅ **Configurable Immutability** – Toggle between immutable collections or in-place modifications.  
✅ **Partial Updates** – Update only what you need, such as node details, edge properties, or metadata fields.  
✅ **Strict Validation** – Prevents duplicate IDs, enforces coordinate uniqueness, and checks all inputs.  
✅ **Custom Metadata Support** – Extend the base `id` and `name` fields with additional properties.  
✅ **Well-Defined Exceptions** – Predictable error handling for invalid operations or conflicts.  
✅ **Built-In Graph Analysis** – Quickly check `degree`, `in`, `out`, and `neighbors` for any node.  
✅ **Intuitive Import/Export** – Easily serialize your entire graph with `import(graph)` and `export()`.

## 🗂️ Graph API Reference

### 📂 Core Structure

| **API**            | **Type** | **Signature**         | **Description**                                                    |
| :----------------- | :------- | :-------------------- | :----------------------------------------------------------------- |
| **graph.metadata** | Data     | `metadata` (property) | A metadata object containing top-level details about the graph.    |
| **graph.nodes**    | Data     | `nodes` (property)    | A collection of nodes (e.g., for storing positions, labels, etc.). |
| **graph.edges**    | Data     | `edges` (property)    | A collection of edges (connections) between nodes.                 |

---

### ⚙️ Graph Operations

| **API**         | **Signature**         | **Type** | **Description**                                                                                |
| :-------------- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------- |
| **Constructor** | `constructor(graph?)` | Logic    | Initializes metadata, nodes, and edges when optionally provided with initial data.             |
| **import**      | `import(graph)`       | Logic    | Replaces the entire graph’s data with new data (in a JSON-like structure).                     |
| **export**      | `export()`            | Logic    | Returns all current graph data (in a JSON-like structure).                                     |
| **toJSON**      | `toJSON()`            | Logic    | Alias for `export()`.                                                                          |
| **degree**      | `degree(id)`          | Logic    | Calculates the total number of connections for a node (incoming + outgoing) by its identifier. |
| **in**          | `in(id)`              | Logic    | Returns the count of incoming connections for a given node.                                    |
| **out**         | `out(id)`             | Logic    | Returns the count of outgoing connections for a given node.                                    |
| **neighbors**   | `neighbors(id)`       | Logic    | Retrieves the identifiers of all nodes directly connected to the specified node.               |

---

### ⚙️ Metadata Operations

| **API**    | **Signature**     | **Type** | **Description**                                                                                  |
| :--------- | :---------------- | :------- | :----------------------------------------------------------------------------------------------- |
| **add**    | `add(metadata)`   | Logic    | Adds metadata if none is currently assigned; throws an error if metadata already exists.         |
| **update** | `update(details)` | Logic    | Updates metadata with new details, preserving existing fields and adding new ones as needed.     |
| **remove** | `remove(keys?)`   | Logic    | Removes specified metadata fields, or resets entirely if no keys are given.                      |
| **toJSON** | `toJSON()`        | Logic    | Returns a JSON-like representation of the metadata object, including any custom/extended fields. |

---

### ⚙️ Node Operations

| **API**               | **Signature**                | **Type** | **Description**                                                                             |
| :-------------------- | :--------------------------- | :------- | :------------------------------------------------------------------------------------------ |
| **add**               | `add(nodes)`                 | Logic    | Adds one or more nodes; automatically ensures each has an identifier and valid coordinates. |
| **update**            | `update(id, details)`        | Logic    | Updates the node matching the given identifier with new details.                            |
| **remove**            | `remove(id)`                 | Logic    | Removes the node matching the given identifier.                                             |
| **findById**          | `findById(id)`               | Logic    | Retrieves the node for a given identifier, if any.                                          |
| **findByCoordinates** | `findByCoordinates(coords)`  | Logic    | Finds a node by its exact `(x, y)` coordinates.                                             |
| **move**              | `move(id, coords)`           | Logic    | Moves the node with the given identifier to new coordinates.                                |
| **translate**         | `translate(idOrIds, offset)` | Logic    | Translates one or multiple nodes by a given `(dx, dy)` offset.                              |
| **toJSON**            | `toJSON()`                   | Logic    | Returns an array of all nodes in a JSON-like format.                                        |

---

### ⚙️ Edge Operations

| **API**          | **Signature**              | **Type** | **Description**                                                                                          |
| :--------------- | :------------------------- | :------- | :------------------------------------------------------------------------------------------------------- |
| **add**          | `add(edges)`               | Logic    | Adds one or more edges; automatically ensures each edge has an identifier.                               |
| **update**       | `update(id, details)`      | Logic    | Updates an edge by its identifier.                                                                       |
| **remove**       | `remove(id)`               | Logic    | Removes the edge matching the given identifier.                                                          |
| **findById**     | `findById(id)`             | Logic    | Locates an edge by its identifier.                                                                       |
| **findBySource** | `findBySource(sourceId)`   | Logic    | Retrieves all edges originating from the specified source.                                               |
| **findByTarget** | `findByTarget(targetId)`   | Logic    | Retrieves all edges pointing to the specified target.                                                    |
| **move**         | `move(id, coordsOrOffset)` | Logic    | Moves or shifts the edge’s coordinates, depending on whether absolute coordinates or an offset is given. |
| **toJSON**       | `toJSON()`                 | Logic    | Returns all edges in a JSON-like array.                                                                  |

## 🛡️ Exception Handling

The library throws **structured exceptions** for invalid operations:

| Exception                    | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `InvalidArgumentException`   | Raised for invalid values (e.g., incorrect UUID format).             |
| `ImmutablePropertyException` | Thrown when attempting to modify an immutable property (e.g., `id`). |
| `ValidationException`        | Raised when multiple validation rules fail.                          |
| `AssignedException`          | Thrown when attempting to reassign existing metadata.                |
| `UnassignedException`        | Raised when updating uninitialized metadata.                         |
| `MissMatchException`         | Thrown when metadata identifiers do not match.                       |

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA-4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> - Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
> - NonCommercial: You may not use this material for commercial purposes.
> - ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.

For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
