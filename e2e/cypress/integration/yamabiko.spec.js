describe('Yamabiko Test', () => {
  it('link and view', () => {
    cy.visit('/')
    cy.get('#toYamabikoLink').click()
    // FizzBuzzという文言が表示されていることを確認する
    expect(cy.get('#title').contains('Yamabiko')).to.exist
  })
  it('やまびこ', () => {
    cy.visit('/yamabiko')
    cy.get('#yamabiko-input').type('test')
    cy.get('#yamabiko-button').click()
    // FizzBuzzという文言が表示されていることを確認する
    cy.get('#yamabiko-response').should('have.text', 'res: test')
  })
  it('やまびこリダイレクト', () => {
    cy.visit('/yamabiko')
    cy.get('#yamabiko-form').type('test')
    cy.get('#yamabiko-form-button').click()
    // FizzBuzzという文言が表示されていることを確認する
    cy.url().should('eq', 'http://localhost:3000/yamabiko-res?message=test')
    cy.get('#yamabiko-response').should('have.text', 'res: test')
  })
})