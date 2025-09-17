import { Component, useState } from 'react'

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

const Person = ({ person }) => (
  <li>{person.name} {person.number}</li>
)

const Persons = ({ persons }) => (
  <div>
  {persons.map(person => (
    <Person key={person.name} person={person} />
  ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000' },
    { name: 'eemil     k', number: '1234' }
  ]) 
  const [filter, setFilter] = useState('') 
  const [newName, setNewName] = useState('a new Person...')
  const [newNumber, setNewNumber] = useState('a new Number...')

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
    setPersons(persons.concat(nameObject))
    setNewName('a new Person...')
    setNewNumber('a new Number...')
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
      <Persons persons={showPersons} />
    </div>
  )

}

export default App