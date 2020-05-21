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
  const view = user => λ.pick(user, ['id', 'email', 'name'])
  const user_id = req.params.id
  const user = await User.findById(user_id)

  if (!user) {
    return res.sendStatus(404)
  }

  return res.json(view(user))
}))
// UPDATE
.put(asyncHandler(async (req, res) => {
  const view = user => λ.pick(user, ['id', 'email', 'name'])

  const userParams = () =>
    λ.pick(req.body, ['name', 'email', 'password'])

  const user_id = req.params.id

  const user = await User.findByIdAndUpdate(
    user_id, userParams(), { new: true }
  )

  return res.json(view(user))
}))
// DELETE
.delete(asyncHandler(async (req, res) => {
  const user_id = req.params.id

  await User.findByIdAndDelete(user_id)

  return res.sendStatus(204)
}))


const port = process.env.SERVER_PORT || 8000

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
