const Db = require('./db.js')

Db.connect()


const Express = require('express')

const CreateUser = require('./create_user/handler.js')
const ShowUser = require('./show_user/handler.js')
const UpdateUser = require('./update_user/handler.js')
const DeleteUser = require('./delete_user/handler.js')

const asyncHandler = handler => (req, res, next) =>
  handler(req, res, next).catch(next)

const app = Express()

app.use(Express.json())

app.post('/users', asyncHandler(CreateUser.handler))

app.route('/users/:id')
  .get(asyncHandler(ShowUser.handler))
  .put(asyncHandler(UpdateUser.handler))
  .delete(asyncHandler(DeleteUser.handler))


const port = process.env.SERVER_PORT || 8000

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
