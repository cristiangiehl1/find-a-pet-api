import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doeee@example.com',
      whatsapp: '11 98765-4321',
      password: '123456',
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jane.doeee@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
