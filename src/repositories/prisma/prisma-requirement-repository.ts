import { prisma } from '@/lib/prisma'

import { RequirementsRepository } from '../requirements-repository'

export class PrismaRequirementRepository implements RequirementsRepository {
  async findManyByPetId(id: string) {
    const requirements = await prisma.requirement.findMany({
      where: {
        pet_id: id,
      },
    })

    return requirements
  }
}
