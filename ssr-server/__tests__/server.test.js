const request = require('supertest')
const {createServer} = require('../server')

describe('リダイレクト確認', () => {
  it('get /api/yamabiko', async () => {
    const {app} = await createServer()
    const res = await request(app).get('/api/yamabiko?message=test')
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/yamabiko-res?message=test')
  })
  it('post /api/yamabiko', async () => {
    const {app} = await createServer()
    const res = await request(app)
      .post('/api/yamabiko')
      .send({
        message: 'test',
      })
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/yamabiko-res?message=test')
  })
})