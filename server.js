const Db = require('./db.js')
const User = require('./models/User.js')

Db.connect()


const Express = require('express')

const app = Express()
const port = process.env.SERVER_PORT || 8000

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})

// CREATE
app.post('/users', (req, res) => {
  // User.create()
})

app.route('/users/:id')
// READ
.get((req, res) => {
  // User.findById()
})
// UPDATE
.put((req, res) => {
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req, res) => {
  // User.findByIdAndDelete()
})
