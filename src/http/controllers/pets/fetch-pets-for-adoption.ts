import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z
      .enum(['PUPPY', 'JUNIOR', 'ADULT', 'MATURE_ADULT', 'SENIOR'])
      .optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energy: z
      .enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH', 'VERY_HIGH'])
      .optional(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    space: z.enum(['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, age, energy, independence, size, space, page } =
    searchPetsQuerySchema.parse(request.query)

  const query = { age, energy, independence, size, space }

  const searchPetsService = makeSearchPetsService()

  const { pets } = await searchPetsService.execute({
    city,
    query,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
