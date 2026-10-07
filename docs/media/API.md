# Graph API Reference

Complete API documentation for the Graph Data Structure library.

## 📂 Core Structure

| **API**            | **Type** | **Signature**         | **Description**                                                    |
| :----------------- | :------- | :-------------------- | :----------------------------------------------------------------- |
| **graph.metadata** | Data     | `metadata` (property) | A metadata object containing top-level details about the graph.    |
| **graph.nodes**    | Data     | `nodes` (property)    | A collection of nodes (e.g., for storing positions, labels, etc.). |
| **graph.edges**    | Data     | `edges` (property)    | A collection of edges (connections) between nodes.                 |

---

## ⚙️ Graph Operations

| **API**          | **Signature**                      | **Type** | **Description**                                                                                                                          |
| :--------------- | :--------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Constructor**  | `constructor(graph?)`              | Logic    | Initializes metadata, nodes, and edges when optionally provided with initial data. A graph without an id gets a generated one; a name is optional. |
| **import**       | `import(graph)`                    | Logic    | Replaces the entire graph's data with new data (in a JSON-like structure).                                                               |
| **export**       | `export()`                         | Logic    | Returns all current graph data (in a JSON-like structure).                                                                               |
| **toJSON**       | `toJSON()`                         | Logic    | Alias for `export()`.                                                                                                                    |
| **degree**       | `degree(id)`                       | Logic    | Calculates the total number of connections for a node (incoming + outgoing) by its identifier.                                           |
| **in**           | `in(id)`                           | Logic    | Returns the count of incoming connections for a given node.                                                                              |
| **out**          | `out(id)`                          | Logic    | Returns the count of outgoing connections for a given node.                                                                              |
| **neighbors**    | `neighbors(id)`                    | Logic    | Retrieves the identifiers of all nodes directly connected to the specified node.                                                         |
| **extent**       | `extent()`                         | Logic    | Computes the spatial extent of the graph in coordinate space. **Only operates when nodes have coordinates.**                        |
| **domain**       | `domain()`                         | Logic    | Computes the rectangular domain of the graph by determining the minimum and maximum. **Only operates when nodes have coordinates.** |
| **trajectories** | `trajectories(origin,destination)` | Logic    | Returns array of trajectories with each trajectory a sequence of edges connecting origin to destination                                  |
| **journeys**     | `journeys(origin,destination)`     | Logic    | Returns array of journeys containing nodes and edges with each pair representing a valid journey from origin to destination              |

---

## ⚙️ Metadata Operations

| **API**    | **Signature**     | **Type** | **Description**                                                                                  |
| :--------- | :---------------- | :------- | :----------------------------------------------------------------------------------------------- |
| **add**    | `add(metadata)`   | Logic    | Adds metadata if none is currently assigned; throws an error if metadata already exists. Keeps the current id when the added metadata has none. |
| **update** | `update(details)` | Logic    | Updates metadata with new details, preserving existing fields and adding new ones as needed.     |
| **remove** | `remove(keys?)`   | Logic    | Removes specified metadata fields; if no keys are given, clears the name and custom fields and keeps the id. |
| **toJSON** | `toJSON()`        | Logic    | Returns a JSON-like representation of the metadata object, including any custom/extended fields. |

---

## ⚙️ Node Operations

| **API**               | **Signature**                | **Type** | **Description**                                                                                                                                                                                                  |
| :-------------------- | :--------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **add**               | `add(nodes)`                 | Logic    | Adds one or more nodes; automatically ensures each has an identifier and valid coordinates.                                                                                                                      |
| **update**            | `update(id, details)`        | Logic    | Updates the node matching the given identifier with new details.                                                                                                                                                 |
| **remove**            | `remove(id)`                 | Logic    | Removes the node matching the given identifier.                                                                                                                                                                  |
| **findById**          | `findById(id)`               | Logic    | Retrieves the node for a given identifier, if any.                                                                                                                                                               |
| **findByCoordinates** | `findByCoordinates(coords)`  | Logic    | Finds a node by its exact `(x, y)` coordinates. **Only operates when all nodes have coordinates.**                                                                                                              |
| **move**              | `move(id, coords)`           | Logic    | Moves the node with the given identifier to new coordinates. **Only operates when all nodes have coordinates.**                                                                                                 |
| **translate**         | `translate(idOrIds, offset)` | Logic    | Translates one or multiple nodes by a given `(dx, dy)` offset. **Only operates when all nodes have coordinates.**                                                                                               |
| **project**           | `project(transform)`         | Logic    | Applies a transformation function to the coordinates of each node, returning an array with all node coordinates projected using the transformation function. **Only operates when all nodes have coordinates.** |
| **toJSON**            | `toJSON()`                   | Logic    | Returns an array of all nodes in a JSON-like format.                                                                                                                                                             |

---

## ⚙️ Edge Operations

| **API**          | **Signature**              | **Type** | **Description**                                                                                                                                              |
| :--------------- | :------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **add**          | `add(edges)`               | Logic    | Adds one or more edges; automatically ensures each edge has an identifier.                                                                                   |
| **update**       | `update(id, details)`      | Logic    | Updates an edge by its identifier.                                                                                                                           |
| **remove**       | `remove(id)`               | Logic    | Removes the edge matching the given identifier.                                                                                                              |
| **findById**     | `findById(id)`             | Logic    | Locates an edge by its identifier.                                                                                                                           |
| **findBySource** | `findBySource(sourceId)`   | Logic    | Retrieves all edges originating from the specified source.                                                                                                   |
| **findByTarget** | `findByTarget(targetId)`   | Logic    | Retrieves all edges pointing to the specified target.                                                                                                        |
| **move**         | `move(id, coordsOrOffset)` | Logic    | Moves or shifts the edge's coordinates, depending on whether absolute coordinates or an offset is given. **Only operates when all edges have coordinates.**                                                     |
| **translate**    | `translate(idOrIds, offset)` | Logic  | Translates one or multiple edges by a given `(dx, dy)` offset. **Only operates when all edges have coordinates.**                           |
| **project**      | `project(transform)`       | Logic    | Applies a transformation function to the coordinates of each edge, returning an array with all edge coordinates projected using the transformation function. **Only operates when all edges have coordinates.** |
| **toJSON**       | `toJSON()`                 | Logic    | Returns all edges in a JSON-like array.                                                                                                                      |

---

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
| `DuplicateException`         | Raised when a duplicate ID or coordinate is detected.                |
| `NotFoundException`          | Thrown when a requested node or edge is not found.                   |
| `InvalidIndexException`      | Raised when an array index is out of bounds.                         |
