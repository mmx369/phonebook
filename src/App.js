import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleCLick = (props) => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personsServices
        .delName(props.id)
        .then(() => personsServices.getAll())
        .then((response) => setPersons(response.data));
    }
    setNewMessage(`${props.name} deleted`);
    setTimeout(() => {
      setNewMessage(null);
    }, 3000);
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setNewSearch(newValue);
  };

  const handleUpdate = (noteObj) => {
    personsServices.create(noteObj).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      setNewMessage(`Added ${noteObj.name}`);
      setTimeout(() => {
        setNewMessage(null);
      }, 3000);
    });
  };

  const replacePersonsNumber = (replacePers) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      replacePers.number = newNumber;
      personsServices
        .update(replacePers.id, replacePers)
        .then(() => personsServices.getAll())
        .then((response) => setPersons(response.data))
        .catch((error) => {
          setErrorMessage(
            `Information of '${newName}' has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
    setNewMessage(`${newName}'s number updated`);
    setTimeout(() => {
      setNewMessage(null);
    }, 3000);
  };

  const addName = (event) => {
    event.preventDefault();
    const noteObj = {
      name: newName,
      number: newNumber,
    };
    persons.some((el) => el.name === newName)
      ? replacePersonsNumber(persons.find((el) => el.name === newName))
      : handleUpdate(noteObj);
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

        <Notification message={newMessage} />
        <Notification message={errorMessage} />

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
              handleCLick={() => handleCLick(person)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
