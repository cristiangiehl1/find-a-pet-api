import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { OrgWithSameEmailError } from '../errors/org-with-same-email-error'
import { RegisterService } from '../register'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterService(inMemoryOrgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doe@example.com',
      whatsapp: '11 98765-4321',
      password: '123456',
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email: 'jane.doe@example.com',
      whatsapp: '11 98765-4321',
      password: '123456',
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    })

    const isPasswordCorrectylHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectylHashed).toBe(true)
  })

  it('should not be able to register with same e-mail twice', async () => {
    const email = 'jane.doe@example.com'

    await sut.execute({
      name: 'Pet Adoption Organization',
      owner: 'Jane Doe',
      email,
      whatsapp: '11 98765-4321',
      password: '123456',
      cep: '01234-567',
      address: '123 Pet Street',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Animais',
      longitude: -46.64135,
      latitude: -23.5489,
    })

    await expect(() =>
      sut.execute({
        name: 'Pet Adoption Organization',
        owner: 'Jane Doe',
        email,
        whatsapp: '11 98765-4321',
        password: '123456',
        cep: '01234-567',
        address: '123 Pet Street',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Jardim Paulista',
        street: 'Rua dos Animais',
        longitude: -46.64135,
        latitude: -23.5489,
      }),
    ).rejects.toBeInstanceOf(OrgWithSameEmailError)
  })
})
