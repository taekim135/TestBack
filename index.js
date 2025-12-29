// Notes Backend Server

require("dotenv").config()
const express = require('express')
const app = express()
const Note = require('./models/note')

// cors not needed as same origins now (port,domain,protocol)
//const cors = require('cors')
//app.use(cors())

app.use(express.json())
app.use(express.static('dist'))
//serve front end files
// all bundled into a folder called dist
// npm run build


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false
  }
]


// not needed as we are using dist folder
// app.get("/", (request,response) =>{
//   response.send("<h1>Hello World!</h1>")
// })


// fetching notes straight from mongoDB
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get("/api/notes/:id", (request,response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note){
    response.json(note)
  }else{
    response.status(404).end()
  }
})


app.delete("/api/notes/:id", (request,response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content){
    return response.status(400).json({ error: "content empty" })
  }

  const note = {
    content: body.content,
    important: body.important || false
  }
  

  notes = notes.concat(note)
  response.json(note)
})


// for any other unknown api routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Backened Server (Notes data) running on port http://localhost:${PORT}`)
})
