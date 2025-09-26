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
  <li>{person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>DELETE</button></li>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
  {persons.map(person => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ))}
  </div>
)

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('') 
  const [newName, setNewName] = useState('a new Person...')
  const [newNumber, setNewNumber] = useState('a new Number...')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)



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

    const existingPerson = persons.find(person => person.name === trimmedName)

    if (existingPerson) {
      if (existingPerson.number === trimmedNumber) {
        alert(`${trimmedName} is already in the phonebook with the same number.`)
        return
      }

      if (window.confirm(` ${trimmedName} is already added to phonebook, replace the old number with a new one? `)) {
        const updatedPerson = { ...existingPerson, number: trimmedNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => person.id !== existingPerson.id ? person : returnedPerson)
            );
            setNewName('a new Person...')
            setNewNumber('a new Number...')
            setSuccessMessage(`Changed ${trimmedName}'s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 4000)
          })
          .catch(error => {
            const message = error.response?.data?.error || `Information of ${trimmedName} has already been removed from server`
            setErrorMessage(message)
            setTimeout(() => setErrorMessage(null), 4000)
          })
      }
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
        setSuccessMessage(`Added ${trimmedName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
      })
      .catch(error => {
        const message = error.response?.data?.error || 'Unexpected error'
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(null), 4000)
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

  const handleDeletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          console.log(`${name} on poistettu palvelimelta`)
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${name} contactinfo`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
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
      <Persons persons={showPersons} handleDelete={handleDeletePerson} />
    </div>
  )

}

export default App