import React, { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector({onChange}) {
  const [value, setValue] = useState('');
  const options: any = useMemo(() => countryList().getData(), [])

  const changeHandler = (value: any) => {
    setValue(value);
    onChange(value);
  }

  useEffect(() => {
    const USValue = options.find(({ value }) => value === 'US');
    setValue(USValue);
  }, [options])
  

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector