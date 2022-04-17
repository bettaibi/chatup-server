const { gql } = require('apollo-server');

const typeDefs = gql`

    type Query{
        user(id: ID!): User!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        phone: String
        bio: String
        avatar: String
        city: String
        country: String
    }

`;

export default typeDefs;