import { Pet, Photo, Requirement } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { PhotosRepository } from '@/repositories/photos-repository'
import { RequirementsRepository } from '@/repositories/requirements-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsServiceRequest {
  petId: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
  requirements: Requirement[] | null
  photos: Photo[] | null
}

export class GetPetDetailsService {
  constructor(
    private petsRepository: PetsRepository,
    private requirementsRepository: RequirementsRepository,
    private photosRepository: PhotosRepository,
  ) {}

  async execute({
    petId,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    const requirements =
      await this.requirementsRepository.findManyByPetId(petId)

    const photos = await this.photosRepository.findManyByPetId(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet, requirements, photos }
  }
}
