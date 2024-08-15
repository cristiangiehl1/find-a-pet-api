import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CityNotProvideError } from '../errors/city-not-provide-error'
import { SearchPetService } from '../fetch-pets-for-adoption'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: SearchPetService

describe('Fetch Pets For Adoption Service', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetService(inMemoryPetsRepository, inMemoryOrgsRepository)

    await inMemoryOrgsRepository.create({
      id: 'Org 1',
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doe@example.com',
      whatsapp: '11 98765-4321',
      password_hash: '123456',
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    })
  })

  it('should be able to fetch pets for adoption', async () => {
    for (let i = 1; i < 23; i++) {
      await inMemoryPetsRepository.create({
        id: `Pet for adoption ${i}`,
        name: 'Buddy',
        about: 'Um cão amigável e cheio de energia que adora brincar.',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'MEDIUM',
        space: 'MEDIUM_SPACE',
        org_id: 'Org 1',
      })
    }

    const filteredPets = await sut.execute({
      city: 'São Paulo',
      query: {},
      page: 2,
    })

    expect(filteredPets.pets).toHaveLength(2)
    expect(filteredPets.pets).toEqual([
      expect.objectContaining({ id: 'Pet for adoption 21' }),
      expect.objectContaining({ id: 'Pet for adoption 22' }),
    ])
  })

  it('should be able to fetch pets for adoption with query options', async () => {
    await inMemoryPetsRepository.create({
      id: `Pet for adoption Small`,
      name: 'Buddy',
      about: 'Um cão amigável e cheio de energia que adora brincar.',
      age: 'ADULT',
      size: 'SMALL',
      energy: 'HIGH',
      independence: 'MEDIUM',
      space: 'MEDIUM_SPACE',
      org_id: 'Org 1',
    })

    await inMemoryPetsRepository.create({
      id: `Pet for adoption Large`,
      name: 'Buddy',
      about: 'Um cão amigável e cheio de energia que adora brincar.',
      age: 'ADULT',
      size: 'LARGE',
      energy: 'HIGH',
      independence: 'MEDIUM',
      space: 'MEDIUM_SPACE',
      org_id: 'Org 1',
    })

    const filteredPets = await sut.execute({
      city: 'São Paulo',
      query: { size: 'LARGE' },
      page: 1,
    })

    expect(filteredPets.pets).toHaveLength(1)
    expect(filteredPets.pets).toEqual([
      expect.objectContaining({ id: 'Pet for adoption Large' }),
    ])
  })

  it('should not be able to fetch pets for adoption without provide a city', async () => {
    await expect(
      sut.execute({
        city: '',
        query: {},
        page: 1,
      }),
    ).rejects.toBeInstanceOf(CityNotProvideError)
  })
})
