import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { PetsRepository, Query } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async searchMany(orgsId: string[], query: Query, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
        AND: [
          query.age ? { age: query.age } : {},
          query.energy ? { energy: query.energy } : {},
          query.size ? { size: query.size } : {},
          query.independence ? { independence: query.independence } : {},
          query.space ? { space: query.space } : {},
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
