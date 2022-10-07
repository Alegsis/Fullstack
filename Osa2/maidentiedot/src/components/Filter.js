import { Country, countCountries, ShowListOfCountries } from './Country'
import { ManyMatches, OneMatch, NoMatches } from './Match'

const AddFilter = ({ filter, onChange }) => (
    <Input
        text='Find countries '
        value={filter}
        onChange={onChange}/>
)
const Input = (props) => (
    <div>
        {props.text}
        <input
            value={props.value}
            onChange={props.onChange} />
    </div>
  )

const FilterCountries = (countries, filter) => {
    return (
        countries
            .filter(country => (country.name.common.toLowerCase()).includes(filter.toLowerCase()))
            .map(country => <Country key={country.name.official} country={country} />)
    )}

const FilterAdded = (filter) => {
    return filter.length > 0
}

const ShowFiltered = ({ countries, filter }) => {
    const filteredCountries = FilterCountries(countries, filter)
    const filterIsAdded = FilterAdded(filter)
    const numberOfCountries = countCountries(filteredCountries)

    if (numberOfCountries > 10 && filterIsAdded) {
        return <ManyMatches />

    } else if (numberOfCountries === 0) {
        return <NoMatches />

    } else if (numberOfCountries === 1) {
        return <OneMatch matchedCountry={filteredCountries[0].props.country} />

    } else {
        return <ShowListOfCountries list={filteredCountries} />
    }
}

export {AddFilter, ShowFiltered}