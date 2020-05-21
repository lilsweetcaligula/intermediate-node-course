const User = require('../models/User.js')
const λ = require('lodash')

exports.handler = async (req, res) => {
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
}
