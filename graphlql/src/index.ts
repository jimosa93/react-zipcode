import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { ZipcodeResolver } from './resolvers/zipcode.resolvers'

(async () => {
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ZipcodeResolver]
          }),        
          context: ({ req, res }) => ({ req, res })
      });
    
    const port = process.env.PORT || 4000;
    
    server.listen({ port }).then(({ url }) => {
        console.log(`🚀  Server  ready at ${url}`);
    });
})();    
