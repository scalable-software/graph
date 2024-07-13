![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Graph Structure

This is a ES6 modules that can be used to create a graph structure. The graph structure is a data structure that consists: metadata, nodes and connections.

## Installation

1. Create a new repository using this template

2. Clone the repository to your local machine

3. Install the dependencies

```bash
npm install
```

4. Run the unit tests to ensure everything is working as expected

```bash
npm test
```

5. Build the web component

```bash
npm run build
```

> Note: this module was build using the [web.component](https://github.com/scalable-software/web.component) templates. Follow the link to get more information about the unique features of the architecture in use.

## Usage

A simple demo is provided in the `demo` folder. To run the demo run the following command:

```bash
npm run serve
```

Open the console and you will see a sample node printed to the console.

## API

Extended arrays as used for the graph nodes and connections. The methods available on `graph.nodes` and `graph.connections` includes a fluent API, where possible. The following methods are available:

### Nodes

- `graph.nodes.create(details: Omit<Node, 'id'>): Nodes`
  Create a new node by using the provided details, adding a unique id and adding it to `graph.nodes`

- `graph.nodes.add(node: Node): Nodes`
  Add a node to the graph

- `graph.nodes.addMetadata(id: UUID, metadata: NodeMetadata): Nodes`
  Add metadata to a node in `graph.nodes` where id matches the provided id

- `graph.nodes.update(id: UUID, update: Node): Nodes`
  Update a node in `graph.nodes` where id matches the provided id

- `graph.nodes.updateMetadata(id: UUID, metadata: NodeMetadata): Nodes`
  Update the metadata of a node in `graph.nodes` where id matches the provided id

- `graph.nodes.updateIcon(id: UUID, icon: string): Nodes`
  Update the icon of a node in `graph.nodes` where id matches the provided id

- `graph.nodes.updateCoordinates(id: UUID, coordinates: Coordinates): Nodes`
  Update the coordinates of a node in `graph.nodes` where id matches the provided id

- `graph.nodes.findById(id: UUID): Node`
  Find a node in `graph.nodes` where id matches the provided id

- `graph.nodes.findByType(type: NodeType): Node[]`
  Find all nodes in `graph.nodes` where type matches the provided type

- `graph.nodes.findByCoordinates(coordinates: Coordinates): Node[]`
  Find all nodes in `graph.nodes` where coordinates matches the provided coordinates

- `graph.nodes.translate(id: UUID, offset: Offset): Nodes`
  Translate a node in `graph.nodes` where id matches the provided id by the provided offset

- `graph.nodes.removeMetadata(id: UUID, type: NodeType): Nodes`
  Remove metadata from a node in `graph.nodes` where id matches the provided id and key matches the provided key

- `graph.nodes.remove(id: UUID): Nodes`
  Remove a node from `graph.nodes` where id matches the provided id

### Connections

- `graph.connections.create(details: Omit<Connection, 'id'>): Connections`
  Create a new connection by using the provided details, adding a unique id and adding it to `graph.connections`

- `graph.connections.add(connection: Connection): Connections`
  Add a connection to the `graph.connections`

- `graph.connections.update(id: UUID, update: Connection): Connections`
  Update a connection in `graph.connections` where id matches the provided id

- `graph.connections.findById(id: UUID): Connection`
  Find a connection in `graph.connections` where id matches the provided id

- `graph.connections.translate(id: UUID, offset: Offset): Connections`
  Translate a connection in `graph.connections` where id matches the provided id by the provided offset

- `graph.connections.remove(id: UUID): Connections`
  Remove a connection from `graph.connections` where id matches the provided id

For more details see the documentation available at is available in the `docs` folder after running the following command:

```bash
npm run document
```

## License

> his software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
