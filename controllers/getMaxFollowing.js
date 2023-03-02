const User = require('../models/user');

const getMaxFollowing = async (_, res) => {
  const result = await User.aggregate([
    {
      $addFields: { subscribeLength: { $size: '$subscribe' } },
    },
    { $sort: { subscribeLength: -1 } },
  ]).limit(5);
  res.json(result);
};

module.exports = getMaxFollowing;
