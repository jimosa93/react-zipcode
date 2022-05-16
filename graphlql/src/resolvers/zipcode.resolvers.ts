import { Resolver, Query, Arg } from 'type-graphql';
import { Zipcode, Place } from '../schemas/zipcode.schema'
import axios from 'axios';
import { ZIPCODE_SERVICE_URL } from '../../consts';

@Resolver(() => Zipcode)
export class ZipcodeResolver {
	@Query(() => Zipcode)
	async zipcodeInfo(
		@Arg("zipcode", () => String) zipcode: string,
		@Arg("countryID", () => String) countryID: string,
	) {
		try {
			const request = await axios.get(`${ZIPCODE_SERVICE_URL}${countryID}/${zipcode}`);
			const { data } = await request;
			return {
				zipcode: data['post code'],
				country: data.country,
				countryAbbreviation: data['country abbreviation'],
				places: data.places.map((place: any): Place => (
					{
						placeName: place['place name'],
						longitude: place.longitude,
						state: place.state,
						stateAbbreviation: place['state abbreviation'],
						latitude: place.latitude
					}
				))
			};        
		} catch (error) {
			if (error.response) throw new Error('Zipcode not found');
			else if (error.request) throw error.request;
			else throw error.message;
		}      
	}
}
