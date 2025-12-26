const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    env: {
      adminUser: process.env.USERNAME1,
      adminPass: process.env.PASSWORD1,
      managerUser: process.env.USERNAME2,
      managerPass: process.env.PASSWORD2,
      superviorUser: process.env.USERNAME3,
      superviorPass: process.env.PASSWORD3,
      workerUser: process.env.USERNAME4,
      workerPass: process.env.PASSWORD4,
      MONGO_URI: process.env.MONGO_URI,
    },
    video: true,
    screenshotOnRunFailure: true,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {},
  },
});
