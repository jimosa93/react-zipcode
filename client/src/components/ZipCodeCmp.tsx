import React from 'react'

export default function ZipCodeCmp({ zipcodeData } : any) {
  return (
    <div className='zipcode-container'> 
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
    </div>
  )
}