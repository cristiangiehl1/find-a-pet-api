import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { RegisterService } from '../register'

export function makeRegisterOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new RegisterService(orgsRepository)

  return service
}
