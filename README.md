# App - Find A Friend

## Requisitos Funcionais (RF)
- [x] It should be possible to register a pet.
- [x] It should be possible to list all pets available for adoption in a city.
- [x] It should be possible to filter pets by their characteristics.
- [x] It should be possible to view details of a pet available for adoption.
- [x] It should be possible to register as an ORG (organization).
- [x] It should be possible to log in as an ORG.


## Regras de Negócio (RN)
- [x] To list pets, the city must be provided.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be associated with an ORG.
- [x] Users who want to adopt a pet will contact the ORG via WhatsApp.
- [x] All filters, except for the city, are optional.
- [x] For an ORG to access the application as an admin, it must be logged in.


## Requisitos Não Funcionais (RNF)
- [x] orgs passwords must be encrypted;
- [x] API data must be persisted in a PostgreSQL database;
- [x] all lists of data must be paginated with 20 items per page;
- [x] user must be authenticated using JWT (JSON Web Token).



