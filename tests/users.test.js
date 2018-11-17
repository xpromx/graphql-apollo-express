import request from 'supertest'
const graphQLEndpoint = 'http://localhost:4040/graphql'

describe('Query Users', () => {
  test('It should return the list of users', async (done) => {
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

    const response = await request(graphQLEndpoint).post('?').send(query)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.users.nodes.length).toBeGreaterThan(1)
    done()
  })
})
