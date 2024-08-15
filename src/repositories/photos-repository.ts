import { Photo } from '@prisma/client'

export interface PhotosRepository {
  // create(data: Prisma.PhotoCreateInput): Promise<Photo>
  findManyByPetId(id: string): Promise<Photo[]>
}
