const User = require('../models/user');

const getNotFollowing = async (_, res) => {
  const result = await User.find({ subscribe: [] });
  res.json(result);
};

module.exports = getNotFollowing;
