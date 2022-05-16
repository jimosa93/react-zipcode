import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Place { 
    @Field()
    placeName: string;

    @Field()
    longitude: string;

    @Field()
    state: string;

    @Field()
    stateAbbreviation: string;

    @Field()
    latitude: string;
}

@ObjectType()
export class Zipcode {
    @Field()
    zipcode: string;
    
    @Field()
    country: string;

    @Field()
    countryAbbreviation: string;

    @Field(() => [Place])
    places: Place[];
}
