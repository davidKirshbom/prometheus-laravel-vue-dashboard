const LoadGenerator = require("./utils/loadGeneratorClass");
const targetUrl =
  process.env.TARGET_URL ||
  `http://localhost:${process.env.SERVER_PORT || "3000"}/orders`;
const trafficPattern = process.env.TRAFFIC_PATTERN || "medium";
const loadGenerator = new LoadGenerator(targetUrl, trafficPattern);
loadGenerator.startLoadGeneration();
