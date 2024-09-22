import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  useEffect(() => {
    service.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    service.create(newPerson).then((data) => {
      setPersons([...persons, data]);
      setNewName("");
      setPhoneNumber("");
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      service.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
