import { Requirement } from '@prisma/client'

import { RequirementsRepository } from '../requirements-repository'

export class InMemoryRequirementsRepository implements RequirementsRepository {
  public items: Requirement[] = []

  async findManyByPetId(id: string) {
    const requeriments = this.items.filter((item) => item.pet_id === id)

    return requeriments
  }
}
