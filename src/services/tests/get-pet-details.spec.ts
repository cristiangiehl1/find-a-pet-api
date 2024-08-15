import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetPetDetailsService } from '../get-pet-details'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryRequirementsRepository: InMemoryRequirementsRepository
let inMemoryPhotosRepository: InMemoryPhotosRepository
let sut: GetPetDetailsService

describe('Get Pet Details Service', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryRequirementsRepository = new InMemoryRequirementsRepository()
    inMemoryPhotosRepository = new InMemoryPhotosRepository()
    sut = new GetPetDetailsService(
      inMemoryPetsRepository,
      inMemoryRequirementsRepository,
      inMemoryPhotosRepository,
    )
  })

  it('should be able to get pet details', async () => {
    const createPet = await inMemoryPetsRepository.create({
      id: 'Pet-01',
      name: 'Buddy',
      about: 'Um cão amigável e cheio de energia que adora brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'MEDIUM',
      space: 'MEDIUM_SPACE',
      org_id: '123e4567-e89b-12d3-a456-426614174000',
    })

    const response = await sut.execute({
      petId: createPet.id,
    })

    expect(response.pet).toEqual(expect.objectContaining({ id: 'Pet-01' }))
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(
      sut.execute({
        petId: 'non-existing-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
