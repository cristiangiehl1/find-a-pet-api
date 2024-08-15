import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetPetDetailsService } from '@/services/factories/make-get-pet-details'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = createPetParamsSchema.parse(request.params)

  try {
    const getPetDetailsService = makeGetPetDetailsService()

    const { pet, requirements, photos } = await getPetDetailsService.execute({
      petId,
    })

    const petRequeriments = requirements?.map(
      (requeriment) => requeriment.requirement,
    )

    const petPhotos = photos?.map((photo) => photo.url)

    return reply.status(201).send({ pet, petRequeriments, petPhotos })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
