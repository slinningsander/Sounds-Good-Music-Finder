import { cyan } from '@mui/material/colors'

describe('Start application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Test navbar', () => {
    cy.get('h6').should('contain', 'Sounds Good')
    cy.get('button').should('contain', 'Home')
  })

  it('Test radiobuttons', () => {
    cy.contains('Artist').click()
    cy.contains('Album').click()
    cy.contains('Track').click()
  })

  it('Test search', () => {
    cy.get('input')
    cy.get('button')
  })

  it('Test slider', () => {
    cy.get('[data-cy=SliderContainer]').shadow()
  })
})
