import Countries from "./Countries";
import Country from "./Country";

const Display = ({ allCountries, filter }) => {
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  return <Countries countries={filteredCountries} />;
};

export default Display;
