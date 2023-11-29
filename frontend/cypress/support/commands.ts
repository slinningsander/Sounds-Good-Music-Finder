/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import { DELETE_COMMENT } from '../../src/graphql/mutations/deleteComment.tsx'

Cypress.Commands.add('deleteComment', () => {
  return cy.window().then((win) => {
    const apolloClient = win.__APOLLO_CLIENT__

    const deleteComments = async () => {
      try {
        // Perform the mutation using the Apollo Client instance
        await apolloClient.mutate({
          mutation: DELETE_COMMENT,
          variables: {
            where: {
              text: 'yWy2VUd5p6Pgo95chDbM',
            },
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
    deleteComments()
  })
})
