import { Pet } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository, Query } from '@/repositories/pets-repository'

import { CityNotProvideError } from './errors/city-not-provide-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetServiceRequest {
  city: string
  query: Query
  page: number
}

interface SearchPetServiceReply {
  pets: Pet[] | null
}

export class SearchPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    query,
    page,
  }: SearchPetServiceRequest): Promise<SearchPetServiceReply> {
    if (!city) {
      throw new CityNotProvideError()
    }

    const orgs = await this.orgsRepository.findManyByCity(city)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const orgsIds = orgs.map((org) => org.id)

    const pets = await this.petsRepository.searchMany(orgsIds, query, page)

    return { pets }
  }
}
