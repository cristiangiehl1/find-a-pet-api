import { Requirement } from '@prisma/client'

export interface RequirementsRepository {
  // create(data: Prisma.RequirementCreateInput): Promise<Requirement>
  findManyByPetId(id: string): Promise<Requirement[]>
}
