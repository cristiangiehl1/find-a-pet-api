import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-respository'
import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photo-repository'
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement-repository'

import { GetPetDetailsService } from '../get-pet-details'

export function makeGetPetDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const requirementRepository = new PrismaRequirementRepository()
  const photoRepository = new PrismaPhotosRepository()
  const service = new GetPetDetailsService(
    petsRepository,
    requirementRepository,
    photoRepository,
  )

  return service
}
