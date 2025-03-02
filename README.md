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

### Creating and Modifying Metadata

```typescript
import { Metadata, type IMetadata } from "@scalable.software/graph";
type T = { custom?: string; type?: string } & IMetadata;

let metadata = Metadata.create<T>()
  .add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "test" })
  .update({ name: "test", custom: "custom" })
  .remove(["custom"])
  .update({ name: "test", type: "type" });
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
