![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Module.Example

A comprehensive template for creating ES6 modules, for use in the browser, with unit testing and api document generation.

## Development

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

## Publishing

1. Update the version number in the `package.json` file

2. Create a new pull request to the main branch

3. Once the pull request has been merged, a new package will be published to GitHub Packages

> Note: see the `publishConfig` in `package.json` for more details.

### Typescript Compiler Options

Two different typescript configuration are defined: `tsconfig.build.json` and `tsconfig.test.json`. The typescript complier options of the two files are largely the same. The main difference is that type declarations are included two configuration files are largely the same. Below is an overview of the compiler options used:

```json
{
  "compilerOptions": {
    "module": "es2022",
    "target": "es2022",
    "moduleResolution": "node",
    "declaration": true,
    "rootDir": "./src",
    "outDir": "./dist/",
    "baseUrl": "./",
    "paths": {
      "calculator": ["./src/Calculator.js"]
    }
  },
  "include": ["./src/**/*"]
}
```

The important options to note are:

1. `module`  
   The `es2022` module system is used to enable the use of ESM in the browser.

2. `paths`  
   The `paths` option is used to define module aliases and used in conjunction with importmaps to avoid the use of a bundler. See the section on importmaps for more details.

### Unit Testing

This template enables both realtime and manual unit testing. Realtime unit testing is achieved using `wallaby` and manual unit testing is done using the `karma` test runner with `jasmine` assertion library. Both `wallaby` and `karma` configuration file is located at the root of the project: `wallaby.js`, `karma.conf.js`.

To manually run the unit tests, and generate coverage reports in the `coverage` folder, use the following command:

```bash
npm test
```

### Typedoc Configuration

In addition the typescript compiler options, the `tsconfig.test.json` configuration file also contains Typedoc configuration details. Typedoc is a documentation generator for typescript projects.

To generate the API documentation, in the docs folder, use the following command:

```bash
npm run document
```

### Importmaps

Import maps are a browser feature that enables developers to define how JavaScript module specifiers are resolved to their corresponding files or URLs, allowing for custom mapping of module names to paths and facilitating easier management of dependencies. By using import maps, developers can therefore easily switch between a local file, an NPM installed package or even a CDN hosted file. Also, Import maps is what enables the use of ESM compiled TypeScript to work in the browser without the use of any bundler.

Lastly, the keep the mail HTML file as lean as possible, an injection script is used to inject import maps defined as json objects into the html document. Once, external Import maps have been added to the HTML spec, the injection script will not longer be needed. See the `./importmap` folder, which contains the following files:

1. `inject.js` - The script that injects the import map into the HTML document
2. `importmap.build.js` - The import map used by the demo page
3. `importmap.test.js` - The import map used by the test page

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
