![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Graph Data Structure

## 🚀 Features

✅ **Strong Type Safety** – Fully generic `Metadata<T>` structure.  
✅ **Fluent API** – Chainable, expressive method calls.  
✅ **Immutable & Validated IDs** – Prevents accidental modifications.  
✅ **Partial Updates** – Update metadata without needing full replacements.  
✅ **Strict Validation** – Enforces consistency at every step.  
✅ **Custom Metadata Support** – Easily extend beyond `id` and `name`.  
✅ **Well-Defined Exception Handling** – Ensures predictable error scenarios.

## 📦 Installation

```bash
npm install @scalable.software/graph
```

## 🛠️ Usage

Typically you would not use the standalone `Metadata`, `Nodes`, or `Edges` components of graph independently. However, to get an understanding of the reach features or each of these components, here is a quick overview.

### Creating and Modifying Metadata

As the name implies the `Metadata` class defines the metadata of the graph. As a minimum, metadata includes an `id` and a `name`. However, you can extend the metadata to include any additional properties you require. Here is an example of how to create and modify graph metadata:

1. Import the `Metadata` class and the `IMetadata` interface:

```typescript
import { Metadata, type IMetadata } from "@scalable.software/graph";
```

2. Define a custom type that extends `IMetadata`:

```typescript
type T = { custom?: string; type?: string } & IMetadata;
```

3. Create a new metadata instance and chain method calls to your liking:

```typescript
let metadata = Metadata.create<T>()
  .add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "test" })
  .update({ name: "test", custom: "custom" })
  .remove(["custom"])
  .update({ name: "test", type: "type" });
```

### Create and Modifying Nodes

Again as the name implies the `Nodes` class is used as a container for all the nodes in the graph. As a minimum each node includes an `id` and `coordinates`. However, you can extend the node to include any additional properties you require. Here is an example of how to create and modify nodes:

1. Import the `Nodes` and the `Node` class, as well as the `INode` interface:

```typescript
import { Nodes, Node, type INode } from "@scalable.software/graph";
```

2. Define a custom type that extends `INode`:

```typescript
type T = { name: string; type?: string } & INode;
```

3. Create a new node:

```typescript
const node = Node.create<T>({
  name: "Triage",
  coordinates: { x: 0, y: 0 },
});
```

4. Create a new nodes instance and chain method calls to your liking:

```typescript
const nodes = Nodes.create<T>([node])
  .add([
    {
      name: "Biomarker",
      coordinates: { x: 1, y: 1 },
      type: "Workflow",
    },
    {
      name: "ACS",
      coordinates: { x: 2, y: 2 },
      type: "Gateway",
    },
  ])
  .update(node.id, { type: "workflow" })
  .translate(node.id, { x: 3, y: 3 })
  .move(node.id, { x: 1, y: 1 })
  .remove(node.id)
  .toJSON();
```

### Fluent API Example

The library follows a **fluent API design**, allowing method chaining:

```typescript
const metadata = Metadata.create<T>()
  .add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Graph Node" })
  .update({ custom: "extra-info" })
  .remove(["custom"])
  .update({ type: "vertex" });
```

This approach makes it **easy to modify metadata dynamically** while ensuring validation at every step.

### Immutable & Validated ID

- Once an `id` is set, it **cannot be modified**.
- Any attempt to change `id` results in an exception.

```typescript
metadata.id = "new-id"; // ❌ Throws ImmutablePropertyException
```

### Partial Updates Without Overwriting Existing Data

- You can update **only specific fields** without needing to resupply the `id`.

```typescript
metadata.update({ name: "Updated Name" }); // ✅ id remains unchanged
```

### Metadata Extraction

- Convert metadata to a structured JSON object.

```typescript
console.log(metadata.toJSON()); // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Updated Name", type: "vertex" }
```

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

## 💡 Why Use This Library?

- Provides **a structured way to manage graph metadata** with built-in validation.
- Ensures **metadata consistency** with immutable properties.
- Offers **a modern TypeScript API** that integrates seamlessly with other graph-based libraries.

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA-4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> - Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
> - NonCommercial: You may not use this material for commercial purposes.
> - ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.

For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
