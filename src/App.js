import React, { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      console.log(response);
    });
  }, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setNewSearch(newValue);
  };

  const handleUpdate = (noteName) => {
    axios.post("http://localhost:3001/persons", noteName).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const addName = (event) => {
    event.preventDefault();
    const noteName = {
      name: newName,
      number: newNumber,
    };
    persons.some((el) => el.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : handleUpdate(noteName);
  };

  const filterPerson = persons.filter((elem) => {
    return (
      elem.name.substr(0, newSearch.length).toLowerCase() ===
      newSearch.toLowerCase()
    );
  });

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <Filter value={newSearch} onChange={handleSearchChange} />

        <h2>Add a new</h2>
        <PersonForm
          valueName={newName}
          valueNumber={newNumber}
          onChangeName={handlePersonChange}
          onChangeNumber={handleNumberChange}
          onSubmit={addName}
        />
        <h2>Numbers</h2>
        <ul>
          {filterPerson.map((person) => (
            <Person
              key={person.name}
              person={person.name}
              number={person.number}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
