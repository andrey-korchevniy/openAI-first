const User = require('../models/user');

const listUsers = async (_, res) => {
  const result = await User.find();
  res.json(result);
};

module.exports = listUsers;
