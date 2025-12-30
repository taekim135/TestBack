const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// connection url
const url = process.env.MongoDBURL

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// format data output
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export default {} but model style
// model name Note => collection name notes (small caps + plural)
module.exports = mongoose.model('Note', noteSchema)