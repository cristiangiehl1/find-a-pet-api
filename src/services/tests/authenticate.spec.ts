import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { AuthenticateService } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateService(inMemoryOrgsRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryOrgsRepository.create({
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
      email: 'jane.doe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrgsRepository.create({
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

    await expect(
      sut.execute({
        email: 'jane.doe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await inMemoryOrgsRepository.create({
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

    await expect(
      sut.execute({
        email: 'wrong.email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
