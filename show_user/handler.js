const User = require('../models/User.js')
const λ = require('lodash')

exports.handler = async (req, res) => {
  const view = user => λ.pick(user, ['id', 'email', 'name'])
  const user_id = req.params.id
  const user = await User.findById(user_id)

  if (!user) {
    return res.sendStatus(404)
  }

  return res.json(view(user))
}
