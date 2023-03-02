const User = require('../models/user');
const { RequestError } = require('../helpers/index');

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  let { order_by, order_type } = req.query;
  order_type = order_type === 'desc' ? -1 : 1;

  let result = await User.find({ userId: +id }); // get user by id
  // get list of users, who's subscribed
  let friends = await User.find(
    { subscribe: +id },
    { userId: 1, first_name: 1, gender: 1 }
  );

  if (!result || !friends) {
    throw RequestError(404);
  }
  result = result[0];
  // get friends list
  friends = friends.filter(el => result.subscribe.includes(el.userId) === true);
  // sort with params
  friends.sort(function (a, b) {
    if (a[order_by] > b[order_by]) {
      return order_type;
    }
    if (a[order_by] < b[order_by]) {
      return -1 * order_type;
    }
    return 0;
  });
  result = { ...result._doc, friends };
  res.json(result);
};

module.exports = getUserInfo;
