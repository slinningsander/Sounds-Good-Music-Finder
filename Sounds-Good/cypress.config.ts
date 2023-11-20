import { defineConfig } from 'cypress'

export default defineConfig({
  downloadsFolder: 'src/test/cypress/downloads',
  videosFolder: 'src/test/cypress/videos',
  screenshotsFolder: 'src/test/cypress/screenshots',
  e2e: {
    specPattern: 'src/test/cypress/e2e/*.spec.ts',
    baseUrl: 'http://localhost:5173/project2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
