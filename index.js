// Notes Backend Server
// Receives HTTP requests and RESPONDS

const express = require('express')
const app = express()
const Note = require('./models/note')
const config = require('./utils/config')


//cors not needed as same origins now (port,domain,protocol)
//const cors = require('cors')
//app.use(cors())

app.use(express.json())
app.use(express.static('dist'))
//serve front end files
// all bundled into a folder called dist
// npm run build

const logs = (request, response, next) => {
  console.log('---------')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---------')
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(logs)



// not needed as we are using dist folder
app.get("/", (request,response) =>{
  response.send("<h1>Hello World!</h1>")
})


// fetching notes straight from mongoDB
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get("/api/notes/:id", (request,response, next) => {
  Note.findById(request.params.id)
    .then(note=>{
      return note ? response.json(note) : response.status(404).end()
    })
    // without para = moved to the next route/middleware
    // with para (error) = carried onto the error handler/middleware
    .catch(error => next(error))
})


app.delete("/api/notes/:id", (request,response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result =>{
      // 204 = success but no data to send back
      response.status(204).end()
    })
    .catch(error=>next(error))
})


app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => {
    console.log('New Note Saved to DB');
    response.json(savedNote)
  })
  .catch(error=>next(error))
})


app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        console.log('Note not found in DB');
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        console.log('Note updated');
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})



// for any other unknown api routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
