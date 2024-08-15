import { randomUUID } from 'node:crypto'

import { Pet, Prisma } from '@prisma/client'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

import { PetsRepository, Query } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      space: data.space,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => (item.id = id))

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }

  async searchMany(orgsId: string[] | null, query: Query, page: number) {
    if (!orgsId) {
      throw new ResourceNotFoundError()
    }

    let filteredPets = this.items.filter((item) => orgsId.includes(item.org_id))

    if (query.age) {
      filteredPets = filteredPets.filter((item) => item.age === query.age)
    }

    if (query.size) {
      filteredPets = filteredPets.filter((item) => item.size === query.size)
    }

    if (query.energy) {
      filteredPets = filteredPets.filter((item) => item.energy === query.energy)
    }

    if (query.independence) {
      filteredPets = filteredPets.filter(
        (item) => item.independence === query.independence,
      )
    }

    if (query.space) {
      filteredPets = filteredPets.filter((item) => item.space === query.space)
    }

    const paginatedPets = filteredPets.slice((page - 1) * 20, page * 20)

    return paginatedPets
  }
}
