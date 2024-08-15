import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { GetOrgProfileService } from '../get-org-profile'

export function makeGetOrgProfile() {
  const orgRepository = new PrismaOrgsRepository()
  const service = new GetOrgProfileService(orgRepository)

  return service
}
