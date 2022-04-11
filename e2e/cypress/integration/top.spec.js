describe('My First Test', () => {
  it('test', () => {
    cy.visit('/')
    // FizzBuzzという文言が表示されていることを確認する
    expect(cy.contains('home')).to.exist
    cy.screenshot('homeが表示されること')
  })
})