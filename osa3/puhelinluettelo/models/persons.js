const mongoose = require('mongoose')
require('dotenv').config ()

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(numero) {
        // Hyväksyy muodot "xx-xxxx..." tai "xxx-xxxx..."
        const numeroTestaus = /^\d{2,3}-\d+$/
        return numeroTestaus.test(numero)
      },
      message: props => `${props.value} is not a valid phone number! Format should be like 09-1234567 or 040-1234567.`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
// MATRIAALISTA CNTRL C & V -----------------------------------------