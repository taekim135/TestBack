//SAMPLE
//SAMPLE
//SAMPLE

const mongoose = require('mongoose')
// MongoDB - NoSQL DB. Document orientated db (different to mysql)
// flexible schema (not prefefined)
// json like structure
// collections
// mongoose object documenbt mapper
// high level control

// node mongo.js DBpassword

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://taekim135:${password}@cluster0.8bm1s3f.mongodb.net/noteApp?appName=Cluster0`
const testURL = `mongodb+srv://taekim135:${password}@cluster0.8bm1s3f.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

// actual connection to db
mongoose.connect(testURL, { family: 4 })

// schema = blueprint of db structure
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

// automatically into plural "notes" - Mongoose convention for collection name
const Note = mongoose.model('Note', noteSchema)
// model = constructor compiled
// document = instance of a model (obj)


// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
})

mongoose.connection.close()