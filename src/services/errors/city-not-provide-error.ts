export class CityNotProvideError extends Error {
  constructor() {
    super('You must select a city to fetch pets.')
  }
}
