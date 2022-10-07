import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
  )

  const countCountries = (countries) => {
    return countries.length
}

const ShowListOfCountries = ({list}) => {
    return (
        <ul>
            {list}
        </ul>
    )
}

const RenderCountryDetails = ({country}) => {
    return (
        <>
            <h2> {country.name.common} </h2>
            <p><b>Capital: </b>{country.capital}</p>
            <p><b>Area: </b> {country.area} </p>
            <p>
                <b>Languages:</b>
                {Object.values(country.languages)
                    .map(value =>
                        <li key={value}> {value} </li>)}
            </p>
            <p><b>Flag:</b></p>
            <img
                src={country.flags.png}
                key={country.flags.png}
            />
        </>
    )}

const Country = ({ country }) => {
    const [showDetails, setshowDetails] = useState(false)
    const showCountryDetails = () => setshowDetails(!showDetails)

    return (
        <div>
            <li>
                {country.name.common}
                {' '}
                <Button text= " show " handleClick={showCountryDetails}/>
            </li>
            {showDetails && <RenderCountryDetails key={country.name.official} country={country} />}
        </div>
    )}

export {countCountries, ShowListOfCountries, RenderCountryDetails, Country}