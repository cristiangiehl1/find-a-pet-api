import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetService } from '@/services/factories/make-create-pet-service'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['PUPPY', 'JUNIOR', 'ADULT', 'MATURE_ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energy: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    space: z.enum(['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE']),
    requirements: z.array(z.string()).optional(),
    photos: z.array(z.string()).optional(),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    space,
    requirements,
    photos,
  } = createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()

  const { pet } = await createPetService.execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    space,
    orgId: request.user.sub,
    photos,
    requirements,
  })

  return reply.status(201).send({ petId: pet.id })
}
