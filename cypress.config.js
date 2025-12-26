const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    // video: true,
    screenshotOnRunFailure: true,
    // reporter: "mochawesome",
    // reporterOptions: {
    //   reportDir: "cypress/results",
    //   overwrite: false,
    //   html: true,
    //   json: false,
    // },
    setupNodeEvents(on, config) {},
  },
});
