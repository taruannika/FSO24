import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleClick = (countryName) => {
    setSelectedCountry(countryName === selectedCountry ? null : countryName);
  };

  if (selectedCountry)
    return (
      <Country
        country={countries.find((c) => c.name.common === selectedCountry)}
      />
    );

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}
            <button onClick={() => handleClick(country.name.common)}>
              Show
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Countries;
