# Nestjs Docker GraphQL
Dockerizando a aplicação e configurando o .env | NestJS com GraphQL

# O que significa GraphQL?
Graph Query Language é uma linguagem de consulta e ambiente de execução voltada a servidores para as interfaces de programação de aplicações (APIs) cuja prioridade é fornecer exatamente os dados que os clientes solicitam e nada além.

# Características do GraphQL
Playground
Schemas e types
Queries - consultas no banco
Mutations - alterações no banco
GraphQL não tem cache

# NestJS
Typescript first
Manutenção e Escalabilidade
Segue os principios do SOLID
SOLID: são cinco princípios da programação orientada a objetos que facilitam no desenvolvimento de softwares, tornando-os fáceis de manter e estender. Esses princípios podem ser aplicados a qualquer linguagem de POO.

S.O.L.I.D: Os 5 princípios da POO
S — Single Responsiblity Principle (Princípio da responsabilidade única)
O — Open-Closed Principle (Princípio Aberto-Fechado)
L — Liskov Substitution Principle (Princípio da substituição de Liskov)
I — Interface Segregation Principle (Princípio da Segregação da Interface)
D — Dependency Inversion Principle (Princípio da inversão da dependência)

Modulos -> funcionalidades -> desacoplamento
Classes -> metodos

# Dependencias do projeto
npm install --save @nestjs/typeorm typeorm mysql2 pg
npm i @nestjs/graphql @nestjs/apollo graphql graphql-tools apollo-server-express
npm i class-validator
npm i class-transformer
npm i @nestjs/config

# Comando para criar um module
nest g module user

# Comando para criar um service
nest g service user

# Comando para criar um resolver -> é utilizado pelo graphql, equivalente ao controller em uma chamada REST
nest g resolver user

# Create
mutation {
  createUser(
    data: {
      name: "João Batista do Amaral"
      email: "joaobatista01@gmail.com"
    }
  ) {
  	id
    name
    email
  }
}

# GET
{
  users {
     id
    name
    email
  }
}

# GetByID
{
  user (
    id: "15eb724c-c6be-4112-a2d6-67050906697e"
  ) {
    id
    name
    email
  }
}

# Update
mutation {
  updateUser (
    id: "82c4188f-f28f-4d6b-8d1e-c4971a38d4ba",
    data: {
      name: "Paula da Silva Pereira"
      email: "paulasilva@union.com"
    }
  ){
    id
    name
    email
  }
}

# Delete
mutation {
  deleteUser(id: "0b32868e-3b41-4f9d-9a8d-1debbf748a8b")
}