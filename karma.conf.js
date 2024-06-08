const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    proxies: {
      "/src/": "/base/src/",
      "/test/": "/base/test/unit/",
    },
    files: [
      { pattern: "./importmap/inject.js" },
      { pattern: "./importmap/importmap.test.js" },
      { pattern: "./src/**/*.js", type: "module" },
      { pattern: "./test/unit/**/*.js", type: "module" },
    ],
    preprocessors: {
      "src/**/!(*.test).js": ["karma-coverage-istanbul-instrumenter"],
    },
    plugins: ["karma-*", require("./tasks/benchmarkReporter.js")],
    reporters: ["spec", "coverage-istanbul", "benchmark"],
    benchmarkReporter: {
      dir: "./output",
      filename: "benchmark.report.json",
    },
    coverageIstanbulInstrumenter: {
      esModules: true,
    },
    coverageIstanbulReporter: {
      reports: ["html", "text", "lcovonly"],
      dir: path.join(__dirname, "coverage"),
      skipFilesWithNoCoverage: true,
    },
    customLaunchers: {
      Chrome_with_memory: {
        base: "Chrome",
        flags: ["--enable-precise-memory-info"],
      },
    },
    browsers: ["Chrome_with_memory"],
    singleRun: true,
    logLevel: config.LOG_DISABLED,
  });
};
