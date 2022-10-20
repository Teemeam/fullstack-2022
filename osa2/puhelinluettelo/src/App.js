import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, errorColor }) => {
  const errorStyle = {
    color: errorColor ? errorColor : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (message === null) {
    return null
  }

  return (
    <div style={ errorStyle }>
      {message}
    </div>
  )
}

const Filter = ({ searchWord, handleFilter }) =>
  <div>
    filter shown with
    <input
      value={ searchWord }
      onChange={ handleFilter }
    />
  </div>

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => 
  <form onSubmit={ addPerson }>
    <div>
      name:
      <input
        value={ newName }
        onChange={ handlePersonChange }
      />
    </div>
    <div>
      number:
      <input
        value={ newNumber }
        onChange={ handleNumberChange }
      />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>

const Persons = ({ numbers }) => <div>{ numbers }</div>

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorColor, setErrorColor] = useState('green');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilter = (event) => {
    setSearchWord(event.target.value);
    if (event.target.value.length > 0) {
      const filtered = persons.filter(e => e.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons(null);
    }
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.filter(e => e.name === newName).length === 0) {
      const personObj = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      };
      personService
        .create(personObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
          setErrorColor('green');
          setErrorMessage(`Added ${ newPerson.name }`);
          setTimeout(() => { setErrorMessage(null) }, 3000);
        })
    } else {
      if (window.confirm(`${ newName } is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.filter(e => e.name === newName)[0];
        console.log(existingPerson);
        const personObj = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, personObj)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
            setNewName('');
            setNewNumber('');
            setErrorColor('green');
            setErrorMessage(`Changed the phone number of ${ updatedPerson.name }`);
            setTimeout(() => { setErrorMessage(null) }, 3000);
          })
          .catch(error => {
            console.log(error);
            setErrorColor('red');
            setErrorMessage(`Information of ${ existingPerson.name } as already been removed from server`)
            setTimeout(() => { setErrorMessage(null) }, 3000);
          })
      }
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${ person.name }?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(item => item.id !== person.id));
          setErrorColor('green');
          setErrorMessage(`Deleted ${ person.name }`);
          setTimeout(() => { setErrorMessage(null) }, 3000);
        })
    }
  }

  let numbers = null;
  if (filteredPersons) {
    numbers = filteredPersons.map((person) => (
      <div key={ person.id }>
        <p>{ person.name } { person.number }</p>
        <button onClick={ () => removePerson(person) }>delete</button>
      </div>
    ));
  } else {
    numbers = persons.map((person) => (
      <div key={ person.id }>
        <p>{ person.name } { person.number }</p>
        <button onClick={ () => removePerson(person) }>delete</button>
      </div>
    ));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={ errorMessage } errorColor={ errorColor }/>
      <Filter
        searchWord={ searchWord }
        handleFilter={ handleFilter }
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={ addPerson }
        newName={ newName }
        handlePersonChange={ handlePersonChange }
        newNumber={ newNumber }
        handleNumberChange={ handleNumberChange }
      />
      <h2>Numbers</h2>
      <Persons numbers={ numbers }/>
    </div>
  )

}

export default App