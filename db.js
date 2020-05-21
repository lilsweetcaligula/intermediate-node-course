const Assert = require('assert-plus')
const Mongoose = require('mongoose')
const NodeUtils = require('util')

exports.connect = await () => {
  Assert.string(process.env.MONGO_USER, 'process.env.MONGO_USER')
  Assert.string(process.env.MONGO_PASSWORD, 'process.env.MONGO_PASSWORD')
  Assert.string(process.env.MONGO_PORT, 'process.env.MONGO_PORT')

  const host = 'mongo'
  const user = process.env.MONGO_USER
  const password = process.env.MONGO_PASSWORD
  const port = process.env.MONGO_PORT

  const conn_url = `mongodb://${user}:${password}@${host}:${port}/appdata`
  const conn_opts = { useNewUrlParser: true, useUnifiedTopology: true }

  const connectToMongo = NodeUtils.promisify(Mongoose.connect)
  const client = await connectToMongo(conn_url, conn_opts)

  return client
}
