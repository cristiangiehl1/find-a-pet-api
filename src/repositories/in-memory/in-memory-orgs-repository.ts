import { randomUUID } from 'node:crypto'

import { Org, Prisma } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      cep: data.cep,
      address: data.address,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findManyByCity(city: string): Promise<Org[] | null> {
    const orgs = this.items.filter((item) => item.city === city)

    return orgs
  }
}
