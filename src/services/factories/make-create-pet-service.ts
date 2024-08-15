import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-respository'

import { CreatePetService } from '../create-pet'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  // const orgsRepository = new PrismaOrgsRepository()
  const service = new CreatePetService(petsRepository)

  return service
}
