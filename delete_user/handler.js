const User = require('../models/User.js')

exports.handler = async (req, res) => {
  const user_id = req.params.id

  await User.findByIdAndDelete(user_id)

  return res.sendStatus(204)
}
