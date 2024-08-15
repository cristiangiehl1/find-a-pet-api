import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-respository'

import { SearchPetService } from '../fetch-pets-for-adoption'

export function makeSearchPetsService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const service = new SearchPetService(petsRepository, orgsRepository)

  return service
}
