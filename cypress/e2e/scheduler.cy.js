describe('template spec', () => {
  it('Finds an element', () => {
    cy.visit('http://localhost:8000/')

    cy.contains('main').click()

  })

})