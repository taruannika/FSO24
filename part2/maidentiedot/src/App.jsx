import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import countryService from "./services/countries";
import Display from "./components/Display";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (!allCountries) return null;

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filter && <Display allCountries={allCountries} filter={filter} />}
    </div>
  );
};

export default App;
