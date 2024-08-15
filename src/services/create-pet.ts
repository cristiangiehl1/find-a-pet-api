import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetRequest {
  name: string
  about: string | null
  age: 'PUPPY' | 'JUNIOR' | 'ADULT' | 'MATURE_ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH'
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  space: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
  orgId: string
  requirements?: string[]
  photos?: string[]
}

interface CreatePetReply {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    space,
    orgId,
    requirements,
    photos,
  }: CreatePetRequest): Promise<CreatePetReply> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independence,
      space,
      org_id: orgId,
      requirements: requirements
        ? { create: requirements.map((req) => ({ requirement: req })) }
        : undefined,
      photos: photos ? { create: photos.map((url) => ({ url })) } : undefined,
    })

    return {
      pet,
    }
  }
}
