import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CreatePetService } from '../create-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
// let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreatePetService

describe('Create a Pet Service', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    // inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetService(inMemoryPetsRepository)

    // await inMemoryOrgsRepository.create({
    //   id: 'org-01',
    //   name: 'Pet Adoption Organization',
    //   owner: 'Jane Doe',
    //   email: 'jane.doe@example.com',
    //   whatsapp: '11 98765-4321',
    //   password_hash: '123456',
    //   cep: '01234-567',
    //   address: '123 Pet Street',
    //   state: 'SP',
    //   city: 'São Paulo',
    //   neighborhood: 'Jardim Paulista',
    //   street: 'Rua dos Animais',
    //   longitude: -46.64135,
    //   latitude: -23.5489,
    //   created_at: new Date(),
    // })
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Node Dog',
      about: 'Description Test',
      age: 'MATURE_ADULT',
      energy: 'LOW',
      independence: 'HIGH',
      size: 'MEDIUM',
      space: 'SMALL_SPACE',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
