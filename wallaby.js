module.exports = function (wallaby) {
  return {
    files: [
      "importmap/inject.js",
      "importmap/importmap.test.js",
      "src/**/*.ts",
    ],
    tests: ["test/unit/**/*.ts"],
    trace: true,
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({
        module: "es2022",
        target: "es2022",
        sourceMap: true,
        inlineSources: true,
        baseUrl: "./",
        paths: {
          "@scalable-software/graph": ["./src/Index.js"],
          "@scalable-software/graph/Nodes": ["./src/Nodes.js"],
        },
      }),
    },
  };
};
