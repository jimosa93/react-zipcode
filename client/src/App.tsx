import React, { useState } from 'react';
import './App.css';
import { gql, useLazyQuery } from '@apollo/client';
import CountrySelector from './components/CountrySelector'

const GET_ZIPCODE_INFO = gql`
  query($zipcode: String!, $countryID: String!) {
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
  }
`;

const ZipCodeCmp = ({ zipcodeData } : any) => <div className='zipcode-container'>
	<p><b>Zipcode:</b> {zipcodeData?.zipcode}</p>
	<p><b>Country:</b> {zipcodeData?.country}</p>
	<p><b>Country abbreviation:</b> {zipcodeData?.countryAbbreviation}</p>
	<div>
		{zipcodeData?.places.map((place: any, index: number) => (
			<div key={index}>
				<p><b>Place name:</b> {place?.placeName}</p>
				<p><b>State:</b> {place?.state}</p>
				<p><b>State abbreviation:</b> {place?.stateAbbreviation}</p>
				<p><b>Longitude:</b> {place.longitude}</p>
				<p><b>Latitude:</b> {place?.latitude}</p>
			</div>
		))}
	</div>
</div>;

const App: React.FC = () => {
	const [zipcode, setZipcode] = useState('');
	const [countryID, setCountryID] = useState('US');
	const [zipcodeData, setZipcodeData] = useState(null);
	const [error, setError] = useState(false);
	const [searchedItems, setSearchedItems] = useState<any>([]);
	const [getZipcode] = useLazyQuery(GET_ZIPCODE_INFO, {
		fetchPolicy: 'no-cache',
		onCompleted: data => {
			setZipcodeData(data.zipcodeInfo);
			setSearchedItems([
				...searchedItems, 
				data.zipcodeInfo
			]);
			setError(false);
		},
		onError: () => setError(true)
	});
	const handleClick = () => {
		getZipcode( {variables: { zipcode, countryID } });
	}	

	const onChangeHandler = country => {
		setCountryID(country.value)
	}

	const onClearHistory = () => setSearchedItems([]);

	return (
		<div className="App">
			<div className='left'>
				<div>
					<p>Select a country:</p>
					<div className='country-selector'>
						<CountrySelector onChange={onChangeHandler}/>
					</div>
					<div className="row">
						<input 
							type="text" 
							name="zipcode"
							className="input-text"
							placeholder="Enter a Zipcode"
							onChange={e => setZipcode(e.target.value)}
						/>
						<button type="button" onClick={handleClick} disabled={zipcode===''}>Search</button>
					</div>
				</div>
				{error ? <div className='error-message'>Zipcode not found</div> :
				zipcodeData && <ZipCodeCmp zipcodeData={zipcodeData} />}
			</div>
			<div className='right'>
				<p>History:</p>
				<div>
					{searchedItems.slice(-5).map((item: any, index: any) => (
						<div key={index}>
							{item?.zipcode} - {item?.places[0]?.placeName}
						</div>
					))}
				</div>
				<br />
				<button type="button" onClick={onClearHistory} disabled={searchedItems.length===0}>Clear history</button>
			</div>
		</div>
	);
}

export default App;
