import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    state: "",
    message: null,
  });

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

  useEffect(() => {
    if (notificationMessage.message) {
      const timer = setTimeout(() => {
        setNotificationMessage({ ...notificationMessage, message: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: phoneNumber };
    const person = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newPerson.number };
        service
          .update(person.id, changedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : updatedPerson
              )
            );
            setNotificationMessage({
              message: `${updatedPerson.name}'s number was changed successfully`,
              state: "success",
            });
          })
          .catch(() => {
            setNotificationMessage({
              message: `Information of ${newName} has already been removed from server`,
              state: "error",
            });
          });
        setPersons(persons.filter((person) => person.id !== changedPerson.id));
      }
    } else {
      service
        .create(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          setNotificationMessage({
            message: `${newPerson.name} was added succesfully`,
            state: "success",
          });
        })
        .catch((error) => {
          setNotificationMessage({ message: error.message, state: "error" });
        });
    }
    setNewName("");
    setPhoneNumber("");
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      service
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage({
            message: `${personToDelete.name} was removed successfully`,
            state: "success",
          });
        })
        .catch((error) => {
          setNotificationMessage({ message: error.message, state: "error" });
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

  if (!persons) return null;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage.message}
        state={notificationMessage.state}
      />

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
