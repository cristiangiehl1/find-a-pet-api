export class OrgWithSameEmailError extends Error {
  constructor() {
    super('E-mail already in use!')
  }
}
