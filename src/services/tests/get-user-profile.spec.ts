import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetOrgProfileService } from '../get-org-profile'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileService

describe('Get Userr Profile Service', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileService(inMemoryOrgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await inMemoryOrgsRepository.create({
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doe@example.com',
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
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.name).toEqual('Pet Adoption Organization')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(
      sut.execute({
        orgId: 'non-existing-org-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
