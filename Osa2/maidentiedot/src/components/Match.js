import {RenderCountryDetails} from './Country';

const ManyMatches = () => {
    return 'Too many matches, specify another filter'
}

const NoMatches = () => {
    return 'No countries found'
}

const OneMatch = ({matchedCountry}) => {
    return <RenderCountryDetails key={matchedCountry.name.official} country={matchedCountry} />  
}

export {ManyMatches, NoMatches, OneMatch}