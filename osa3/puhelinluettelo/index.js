require('dotenv').config ()
const express = require('express')
const app = express()
const morgan = require('morgan')

const Person = require('./models/persons')
//const { findOne } = require('./models/persons')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

// Virheenkäsittely middleware
const handleError = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(handleError)

morgan.token('body', function (req) { return req.method === 'POST' ? JSON.stringify(req.body) : ''})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find ({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find ({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
  })
})

// Yksittäinen id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Poisto
app.delete('/api/persons/:id', (request, response, next) => {
  console.log('Trying to delete id:', request.params.id)

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        console.log('Deleted:', result)
        response.status(204).end()
      } else {
        console.log('Not found in DB')
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.error('Delete failed:', error.message)
      next(error)
    })
})

// Lisäys
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  {/*
  if (!body.name) {
    return response.status(400).json({ error: 'name or number missing / too short' })
  }
  else if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  } */}

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

// Päivitys
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const updatedPerson = { name, number }

  Person.findByIdAndUpdate(
    request.params.id,
    updatedPerson,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint Rontti lol' })
}

app.use(unknownEndpoint)
app.use(handleError)

// EI TULE MUUUTTUMAAAN
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})