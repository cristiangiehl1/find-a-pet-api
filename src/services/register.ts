import { Org } from '@prisma/client'
import bycrypt from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'

import { OrgWithSameEmailError } from './errors/org-with-same-email-error'

const { hash } = bycrypt

interface RegisterServiceRequest {
  name: string
  owner: string
  email: string
  whatsapp: string
  password: string

  cep: string
  address: string
  state: string
  city: string
  neighborhood: string
  street: string

  latitude: number
  longitude: number
}

interface RegisterOrgServiceResponse {
  org: Org
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
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
  }: RegisterServiceRequest): Promise<RegisterOrgServiceResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgWithSameEmailError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      owner,
      email,
      whatsapp,
      password_hash: passwordHash,
      cep,
      address,
      state,
      city,
      neighborhood,
      street,
      longitude,
      latitude,
    })

    return { org }
  }
}
