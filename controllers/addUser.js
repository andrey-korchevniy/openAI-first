const User = require('../models/user');
const generator = require('../util/generator');

const addUser = async (req, res) => {
  const { num } = req.params;
  const data = await generator(num);
  await User.remove(); // clean collection
  const result = await User.create(data); // create new collection
  res.status(201).json(result);
};

module.exports = addUser;
