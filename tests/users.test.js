import request from 'supertest'
let server

describe('Query Users', () => {
  beforeAll(() => {
    server = require('../server')
  })

  afterAll((done) => {
    server.close()
    setTimeout(done, 1000)
  })
  test('It should return the list of users', async () => {
    const query = {
      query: `
        {
            users {
            nodes {
              id,
              first_name
            }
          }
        }
        `
    }

    const response = await request(server).post('/graphql').send(query)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.users.nodes.length).toBeGreaterThan(1)
  })
})
