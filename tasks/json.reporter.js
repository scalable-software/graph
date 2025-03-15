const fs = require("fs");
const path = require("path");

function jsonReporter(config) {
  var results = [];
  var dir = "";

  this.createReportDirectory = () => {
    dir = config?.benchmarkReporter?.dir ?? "./output";
    fs.mkdirSync(dir, { recursive: true });
    return this;
  };
  this.writeReportToFile = () => {
    let filename = config?.benchmarkReporter?.filename ?? "test.report.json";
    let filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
  };

  this.onRunComplete = (browsers, result) =>
    this.createReportDirectory().writeReportToFile();

  this.onSpecComplete = (
    browser,
    { description, suite, success, properties }
  ) =>
    results.push({
      context: properties.context || "",
      type: properties.type,
      test: properties.test || properties.spec,
      definition: `${suite.join(", ")}, ${description}`,
      status: success === true,
    });
}

jsonReporter.$inject = ["config"];

module.exports = {
  "reporter:json": ["type", jsonReporter],
};
