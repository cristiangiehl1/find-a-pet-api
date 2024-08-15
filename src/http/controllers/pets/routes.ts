import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createPet } from './create'
import { searchPets } from './fetch-pets-for-adoption'
import { getPetDetails } from './get-pet-details'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.post('/pets', { onRequest: verifyJwt }, createPet)
  app.get('/pets/details/:petId', getPetDetails)
  // app.get('/pets/details/')
  app.get('/pets/search', searchPets)
}
