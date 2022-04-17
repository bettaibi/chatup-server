import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import typeDefs from "./typeDefs/schema";
import userResolver from "./resolvers/user.resolver";

const MONGODB_URI = "mongodb://localhost:27017/chatup";

async function connectToDatabase() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.once('open', function () {
        console.log('Connected to the Database.');
    });
    mongoose.connection.on('error', function (error) {
        console.log('Mongoose Connection Error : ' + error);
    });
}

async function bootstrap(typeDefs: any, resolvers: any) {

    const PORT = process.env.PORT || 4000;
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await connectToDatabase();
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

bootstrap(typeDefs, {
    Query: {
        ...userResolver.Query
    },

    // Mutation: {
    //     ...userResolver.Mutation
    // },

    // Subscription: {
    //     ...userResolver.Subscription
    // }
});

// const MONGODB_URI = "mongodb://localhost:27017/my_local_db";   