import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Fetch Pet For Adoption (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets for adoption', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'TypeScript Dog',
        about: 'Description Test',
        age: 'MATURE_ADULT',
        energy: 'LOW',
        independence: 'HIGH',
        size: 'MEDIUM',
        space: 'SMALL_SPACE',
        orgId: 'org-01',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'JavaScript Dog',
        about: 'Description Test',
        age: 'PUPPY',
        energy: 'HIGH',
        independence: 'HIGH',
        size: 'SMALL',
        space: 'SMALL_SPACE',
        orgId: 'org-01',
      })

    const searchByCity = await request(app.server).get(`/pets/search`).query({
      city: 'São Paulo',
    })

    expect(searchByCity.statusCode).toEqual(200)
    expect(searchByCity.body.pets).toHaveLength(2)
    expect(searchByCity.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'JavaScript Dog' }),
        expect.objectContaining({ name: 'TypeScript Dog' }),
      ]),
    )

    const searchByCityAndAge = await request(app.server)
      .get(`/pets/search`)
      .query({
        city: 'São Paulo',
        age: 'PUPPY',
      })

    expect(searchByCityAndAge.statusCode).toEqual(200)
    expect(searchByCityAndAge.body.pets).toHaveLength(1)
    expect(searchByCityAndAge.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'JavaScript Dog' }),
      ]),
    )
  })
})
