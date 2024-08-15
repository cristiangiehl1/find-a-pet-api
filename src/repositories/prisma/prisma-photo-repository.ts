import { prisma } from '@/lib/prisma'

import { PhotosRepository } from '../photos-repository'

export class PrismaPhotosRepository implements PhotosRepository {
  async findManyByPetId(id: string) {
    const photos = await prisma.photo.findMany({
      where: {
        pet_id: id,
      },
    })

    return photos
  }
}
