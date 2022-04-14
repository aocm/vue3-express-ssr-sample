const Yamabiko = require('../../src/domain/yamabiko').default
const yamabikoRegistry = require('../../src/infra/yamabikoRepository').default

describe('やまびこ', () => {
  it('mockで動作確認', async () => {
    // saveMessgeというfunctionを上書きする
    const spy = jest.spyOn(yamabikoRegistry, 'saveMessage')
    spy.mockReturnValue(100)
    // ↓の書き方でもよい
    // yamabikoRegistry.saveMessage.mockReturnValue(100)
    const yamabiko = new Yamabiko('test')
    expect(spy).toHaveBeenCalled()
    expect(yamabiko.message).toBe('test')
    expect(yamabiko.number).toBe(100)
  })
})