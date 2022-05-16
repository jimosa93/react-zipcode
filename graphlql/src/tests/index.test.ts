import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { ZipcodeResolver } from '../resolvers/zipcode.resolvers'

it('returns the Zipcode information', async () => {
  const testServer = new ApolloServer({
    schema: await buildSchema({
        resolvers: [ZipcodeResolver]
      }),        
      context: ({ req, res }) => ({ req, res })
  });

  const sampleData = {
    zipcode: '90210',
    country: 'United States',
    countryAbbreviation: 'US',
    places: [{
        placeName: "Beverly Hills",
        longitude: "-118.4065",
        state: "California",
        stateAbbreviation: "CA",
        latitude: "34.0901"
      }]
  }

  const result = await testServer.executeOperation({
    query: `query($zipcode: String!, $countryID: String!) {
        zipcodeInfo (zipcode: $zipcode, countryID: $countryID) {
          zipcode
          country
          countryAbbreviation
          places {
            longitude
            latitude
            placeName
            state
            stateAbbreviation
          }
        }
      }`,    
    variables: { zipcode: '90210', countryID: 'US' },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data?.zipcodeInfo).toEqual(sampleData);
});