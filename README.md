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

# Estrutura básica de patterns para trabalhar

# Repositories
Os repositories são responsáveis por encapsular toda a lógica de acesso aos dados, centralizando as operações de leitura e escrita no banco de dados. Isso permite uma separação clara entre a lógica de negócio e a persistência dos dados, facilitando a manutenção e a escalabilidade do código. Cada função do repositório é tipada para garantir a integridade dos dados e as interfaces definem o contrato que os repositórios devem seguir.

Como estamos trabalhando com testes, fazemos:
1) Repository in-memory para não bater no banco de dados de produção ou desenvolvimento;
2) Repository com o ORM específico que estamos usando, para isolar bem todo o código relacionado com a lib ou framework específico.


# Use-case ou service
O use-case ou service encapsula a lógica de negócio de uma aplicação. Em vez de manter a lógica espalhada por várias partes do código, ela é centralizada em classes específicas. Essas classes são responsáveis por orquestrar as operações necessárias para cumprir um caso de uso específico.

Injeção de Dependências: Usar classes para implementar use-cases permite a injeção de dependências via construtores. Isso facilita a substituição das dependências por mocks ou stubs durante os testes, permitindo simular diferentes cenários sem precisar de um banco de dados real.

# Factories
As factories são responsáveis por criar instâncias de serviços (ou use-cases) com os repositórios corretos. Elas permitem abstrair o processo de criação de objetos complexos, garantindo que as dependências corretas sejam injetadas automaticamente.

Uso Prático: As factories são úteis para garantir que o código utilize sempre a versão apropriada de um serviço, seja em um ambiente de produção ou de teste.

# Controllers
Os controllers atuam como intermediários entre a camada de apresentação (ou interface de usuário) e a lógica de negócio. Eles recebem as requisições, chamam o use-case apropriado para processar a lógica de negócio e retornam a resposta.

Isolamento: Os controllers isolam a lógica de apresentação da lógica de negócio, permitindo que cada parte da aplicação evolua independentemente.

