import { Photo } from '@prisma/client'

import { PhotosRepository } from '../photos-repository'

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = []

  async findManyByPetId(id: string) {
    const photos = this.items.filter((item) => item.pet_id === id)

    return photos
  }
}
