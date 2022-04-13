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
  
  context.only('やまびこエラー', () => {

    it('21文字以上', () => {
      cy.visit('/yamabiko')
      const length21 = '012345678901234567890'
      cy.get('#yamabiko-form').type(length21)
      cy.get('#yamabiko-form-button').click()
      // FizzBuzzという文言が表示されていることを確認する
      cy.url().should('eq', 'http://localhost:3000/error?message=1~20%E6%96%87%E5%AD%97%E3%81%A7%E3%81%AA%E3%81%84')
    })
    it('0文字', () => {
      cy.visit('/yamabiko')
      const length0 = ''
      // cy.get('#yamabiko-form').type(length0) // 不要
      cy.get('#yamabiko-form-button').click()
      // FizzBuzzという文言が表示されていることを確認する
      cy.url().should('eq', 'http://localhost:3000/error?message=1~20%E6%96%87%E5%AD%97%E3%81%A7%E3%81%AA%E3%81%84')
    })
  })
})