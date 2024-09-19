import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: phoneNumber };

    // prevent adding names that are already in phonebook
    const personAlreadyExists = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    if (personAlreadyExists) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewName("");
      setPhoneNumber("");
      return;
    }

    // if name is not already added to phonebook, add it
    setPersons([...persons, newPerson]);
    setNewName("");
    setPhoneNumber("");
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>add new</h3>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        phoneNumber={phoneNumber}
        handlePhoneNumber={handlePhoneNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
