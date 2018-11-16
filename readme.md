# GraphQL + Apollo + Express 
Boilerplate project for apollo-graphql and express including:
- express
- db:migration
- db:seed
- directives to simplify your work
- localization
- authentication

# Getting Started

## Commands
```
npm start
npm test
```

## Database
```
npm db:migrate
npm db:migrate:make $table
npm db:seed 
```

## Schemas
the GraphQL schemas can be found in `/src/schemas` folder, all the files .graphql in that folder will be loaded automatically and combined

## Directives
All default directives are located in `/src/directives.js`  and `/src/schema/Directives.graphql` 
```
check the examples in the project
```

- `@auth(role: AuthRole = USER)` : Field and Mutations
- `@date(format: String = "D/M/YYYY")` format fields from schema and query
- `@json` : return JSON fields
- `@paginate` : paginate & filter results in Queries
- `@hasOne(field: String)`: return relationships on Fields
- `@hasMany(field: String)` reeturn many to many relationships on Fields
- `@hasPolymorphic` return polymorphic relationships on Fields
- `@findById` return result by Id on Query
- `@create` apply on Mutations
- `@update` apply on Mutations
- `@delete` apply on Mutations

----------

## @auth
with the `@auth` directive you can authorize to show field and excecute mutations.

#### definition:
```
@auth(role: AuthRole = USER)

enum AuthRole {
  USER
  ADMIN
}
```

#### examples:
Applied to field will return null in case of not authorization and in mutations will return an Authorization error
```
type User {
    id: ID!
    first_name: String
    last_name: String
    email: String @auth
}

type Mutation {
    deleteUser(id: ID!): User @auth
}
```

----------
## @date
with the `@date` directive you can format the date fields response from the schema or query

#### definition:
```
directive @date(format: String = "D/M/YYYY") on FIELD_DEFINITION
```

#### examples:
```
type User {
    id: ID!
    first_name: String
    last_name: String
    email: String @auth
    created_at: String @date
    updated_at: String @date("YYY-MM-DD")
}

// Query
users {
    id,
    first_name
    created_at(format:"YYYY")
}
```

--------

## @json or JSON type
with the `@json` directive you can return any JSON field

#### definition:
```
directive @json on FIELD_DEFINITION
```

#### examples:
```
type User {
    id: ID!
    first_name: String
    last_name: String
    meta: String @json
    meta: JSON
}
```

