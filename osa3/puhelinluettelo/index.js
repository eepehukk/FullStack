const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: "1"
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: "2"
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: "3"
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: "4"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find ( person => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const personExists = persons.some(person => person.id === id)
  if (!personExists) {
    return response.status(404).json({ error: 'Person not found' })
  }

  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.number) {
    return response.status(400).json({ 
      error: 'Person\'s number isn\'t added' 
    })
  } else if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
        error: "Contact name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

// EI TULE MUUUTTUMAAAN
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})