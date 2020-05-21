const Db = require('./db.js')
const User = require('./models/User.js')
const λ = require('lodash')

Db.connect()


const Express = require('express')
const app = Express()
const asyncHandler = handler => (req, res, next) =>
  handler(req, res, next).catch(next)

app.use(Express.json())

// CREATE
app.post('/users', asyncHandler(async (req, res) => {
  const userParams = () =>
    λ.pick(req.body, ['name', 'email', 'password'])

  let ins

  try {
    ins = await User.create(userParams())
  } catch (err) {
    console.error(err)
    return res.sendStatus(422)
  }

  return res.json({ id: ins.id })
}))

app.route('/users/:id')
// READ
.get(asyncHandler(async (req, res) => {
  const user_id = req.params.id
  const user = await User.findById(user_id)
  const user_view = λ.pick(user, ['id', 'email', 'name'])

  return res.json(user_view)
}))
// UPDATE
.put((req, res) => {
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req, res) => {
  // User.findByIdAndDelete()
})


const port = process.env.SERVER_PORT || 8000

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
