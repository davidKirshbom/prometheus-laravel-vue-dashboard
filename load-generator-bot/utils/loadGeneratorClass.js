const trafficPatterns = require("./trafficPatterns");
const axios = require("axios");

module.exports = class LoadGenerator {
    constructor(targetUrl, trafficPattern) {
      this.targetUrl = targetUrl;
      this.trafficPattern = trafficPattern;
    }
    async  sendRequest(method, url, data = null) {
      try {
          const response = await axios({ method, url, data });
          console.log(`[SUCCESS] ${method} ${url}: Status ${response.status}`);
      } catch (error) {
          console.error(`[ERROR] ${method} ${url}:`, error.message);
          throw error;
      }
  }
  
    getRandomRequestRate() {
      return (
        Math.floor(
          Math.random() * (trafficPatterns.high - trafficPatterns.low + 1)
        ) + trafficPatterns.low
      );
    }
  
    getRequestRate() {
      return this.trafficPattern === "random"
        ? this.getRandomRequestRate()
        : trafficPatterns[this.trafficPattern];
    }
  
    generateRandomRequest() {
      const method = Math.random() > 0.5 ? "GET" : "POST";
      const data =
        method === "POST"
          ? {
              customer_name: "Test User",
              total_amount: Math.random() * 100,
              status: "pending",
              product_id: "product-" + Math.floor(Math.random() * 10),
            }
          : null;
      return { method, data };
    }
  
    generateLoad(requestsPerSecond) {
      const interval = setInterval(async () => {
        const { method, data } = this.generateRandomRequest();
        try {
          await this.sendRequest(method, this.targetUrl, data);
        } catch (e) {
          console.error(`Error sending request: ${e.message}`);
          clearInterval(interval);
          process.exit(1);
        }
        if (this.trafficPattern === "random") {
          clearInterval(interval);
          setTimeout(() => this.startLoadGeneration(), 1000); // Restart after 1 second delay; this is to prevent infinite recursion
        }
      }, 1000 / requestsPerSecond);
      return interval;
    }
  
    startLoadGeneration() {
      const requestRate = this.getRequestRate();
      if (!requestRate) {
        console.error(`Invalid traffic pattern: ${this.trafficPattern}`);
        process.exit(1);
      }
      console.log(`Sending requests at ${requestRate} requests/sec`);
      this.generateLoad(requestRate);
    }
  }