describe('Start application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Test navbar', () => {
    cy.get('h6').should('contain', 'Sounds Good')
    cy.get('button').should('contain', 'Home')
  })

  it('Test radiobuttons', () => {
    cy.get('[data-cy=ArtistButton]').should('exist').click()
    cy.get('[data-cy=AlbumButton]').should('exist').click()
    cy.get('[data-cy=TrackButton]').should('exist').click()
  })

  it('Test search', () => {
    cy.get('input')
    cy.get('button')
  })

  it('Test slider', () => {
    cy.get('[data-cy=SliderContainer]')
    cy.get('[data-cy=Slider]')
  })
})
