/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Cypress {
  interface Chainable<Subject> {
    deleteComment(): Chainable<any>
  }
  interface AUTWindow {
    __APOLLO_CLIENT__: any // replace "any" with the type of your Apollo Client if known
  }
}
