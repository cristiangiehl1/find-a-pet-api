import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Node Dog',
        about: 'Description Test',
        age: 'MATURE_ADULT',
        energy: 'LOW',
        independence: 'HIGH',
        size: 'MEDIUM',
        space: 'SMALL_SPACE',
        orgId: 'org-01',
      })

    expect(response.statusCode).toEqual(201)
  })
})
