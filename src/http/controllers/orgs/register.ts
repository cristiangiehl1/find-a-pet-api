import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgWithSameEmailError } from '@/services/errors/org-with-same-email-error'
import { makeRegisterOrgService } from '@/services/factories/make-register-org-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    whatsapp: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, {
      message: 'Invalid number format.',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must have at least 6 char.' }),
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/, { message: 'Please insert a valid CEP.' }),
    address: z.string(),
    state: z
      .string()
      .regex(/^[A-Z]{2}$/, { message: 'Please insert a valid State.' }),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    name,
    owner,
    email,
    whatsapp,
    password,
    cep,
    address,
    state,
    city,
    neighborhood,
    street,
    longitude,
    latitude,
  } = registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgService = makeRegisterOrgService()

    await registerOrgService.execute({
      name,
      owner,
      email,
      whatsapp,
      password,
      cep,
      address,
      state,
      city,
      neighborhood,
      street,
      longitude,
      latitude,
    })
  } catch (err) {
    if (err instanceof OrgWithSameEmailError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
