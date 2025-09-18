import { useEffect, useState } from 'react'


const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)


const PersonForm = ({ addPerson, newName, handleName, newNumber, handleNumber}) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={handleName} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person, handleDelete }) => (
  <li>{person.name} {person.number} <button onClick={() => handleDelete(person.name)}>DELETE</button></li>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
  {persons.map(person => (
    <Person key={person.name} person={person} handleDelete={handleDelete} />
  ))}
  </div>
)

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('') 
  const [newName, setNewName] = useState('a new Person...')
  const [newNumber, setNewNumber] = useState('a new Number...')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('pidettiin lupaus')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const showPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (persons.some(person => person.name === trimmedName)) {
      console.log(`${trimmedName} on jo olemassa`)
      alert(`${trimmedName} is already added added to phonebook`)
      return
    }

    const nameObject = { 
      name: trimmedName,
      number: trimmedNumber
    }

    console.log('Testi ilmestyykö henkilö:', nameObject)
    personService
      .create(nameObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('a new Person...')
        setNewNumber('a new Number...')
    })
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('Suodatin:', event.target.value)
    setFilter(event.target.value)
  }

  const deletePerson = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log('iso DELETE', name)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={showPersons} handleDelete={deletePerson} />
    </div>
  )

}

export default App