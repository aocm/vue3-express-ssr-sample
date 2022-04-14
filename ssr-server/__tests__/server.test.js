const request = require('supertest')
const {createServer} = require('../server')

describe('リダイレクト確認', () => {
  it('/yamabiko', async () => {
    const {app} = await createServer()
    const res = await request(app).get('/api/yamabiko?message=test')
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/yamabiko-res?message=test')
  })
})