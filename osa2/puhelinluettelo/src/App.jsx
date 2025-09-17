import { useState } from 'react'

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
    { name: 'Arto Hellas' },
    { name: 'eemil     k'}
  ]) 
  const [filter, setFilter] = useState('') 
  {/*
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
    */}

  const showPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={showPersons} />
    </div>
  )

}

export default App