import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.ccn3}>{country.name.common}</li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return (
      < CountryDetails country={countries[0]} />
    )
  }

  return <p>No matches</p>
}

const CountryDetails = ({ country }) => {
  console.log("Maa:", country)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{ country.capital }</p>
      <p>Area { country.area }</p>

      <h2> Languages </h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <section>
        <img src={country.flags.png}/>
      </section>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  )
}

export default App