describe('Yamabiko Test', () => {
  it('link and view', () => {
    cy.visit('/')
    cy.get('#toYamabikoLink').click()
    expect(cy.get('#title').contains('Yamabiko')).to.exist
  })
  it('やまびこ', () => {
    cy.visit('/yamabiko')
    cy.get('#yamabiko-input').type('test')
    cy.get('#yamabiko-button').click()
    cy.get('#yamabiko-response').should('have.text', ' res: test')
  })
  it('やまびこリダイレクト', () => {
    cy.visit('/yamabiko')
    cy.get('#yamabiko-form').type('test')
    cy.get('#yamabiko-form-button').click()
    cy.url().should('eq', 'http://localhost:3000/yamabiko-res?message=test')
    cy.get('#yamabiko-response').should('have.text', ' res: test')
  })
  
  context('やまびこエラー', () => {

    it('21文字以上', () => {
      cy.visit('/yamabiko')
      const length21 = '012345678901234567890'
      cy.get('#yamabiko-form').type(length21)
      cy.get('#yamabiko-form-button').click()
      cy.url().should('eq', 'http://localhost:3000/error?message=1~20%E6%96%87%E5%AD%97%E3%81%A7%E3%81%AA%E3%81%84')
    })
    it('0文字', () => {
      cy.visit('/yamabiko')
      const length0 = ''
      // cy.get('#yamabiko-form').type(length0) // 不要
      cy.get('#yamabiko-form-button').click()
      cy.url().should('eq', 'http://localhost:3000/error?message=1~20%E6%96%87%E5%AD%97%E3%81%A7%E3%81%AA%E3%81%84')
    })
  })

  context('session', () => {
    it('セッション確認', () => {
      cy.visit('/yamabiko')
      cy.get('#yamabiko-form').type('test1')
      cy.get('#yamabiko-form-button').click()
      cy.get('#toYamabikoLink').click()
      cy.get('#yamabiko-form').type('test2')
      cy.get('#yamabiko-form-button').click()
      cy.get('#toHistoryLink').click()
        .then('',()=>{
          cy.get('#history-1').should('have.text', 'test1')
          cy.get('#history-2').should('have.text', 'test2')
        })
    })
  })
})