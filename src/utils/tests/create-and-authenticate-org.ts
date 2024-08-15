import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doeee@example.com',
      whatsapp: '11 98765-4321',
      password_hash: await hash('123456', 6),
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jane.doeee@example.com',
    password: '123456',
  })

  const { accessToken } = authResponse.body

  return { accessToken }
}
