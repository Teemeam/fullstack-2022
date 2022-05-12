import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [searchWord, setSearchWord] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${ newName } is already added to phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  let numbers = null;
  if (filteredPersons) {
    numbers = filteredPersons.map((person) => (
      <p key={ person.id }>{ person.name } { person.number }</p>
    ));
  } else {
    numbers = persons.map((person) => (
      <p key={ person.id }>{ person.name } { person.number }</p>
    ));
  }

  return (
    <div>
      <h2>Phonebook</h2>
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