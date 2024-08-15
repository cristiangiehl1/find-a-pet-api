import { Pet, Prisma } from '@prisma/client'

export interface Query {
  age?: 'PUPPY' | 'JUNIOR' | 'ADULT' | 'MATURE_ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy?: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH'
  independence?: 'LOW' | 'MEDIUM' | 'HIGH'
  space?: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(
    orgsId: string[] | null,
    query: Query,
    page: number,
  ): Promise<Pet[] | null>
}
