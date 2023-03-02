const NAME_URL = 'https://names.drycodes.com/';
const arrUsers = [];

async function generator(n = 10) {
  const url = NAME_URL + `${n}`;

  // generate uniq `n` names
  async function getNames(url) {
    await fetch(url)
      .then(res => res.json())
      .then(res => makeArr(res))
      .catch(err => makeArr(null));
  }

  // make array of objects 'name + gender'
  const makeArr = arr => {
    const arrNames = arr === null ? ['John', 'Steve', 'Ann', 'Julia'] : arr;

    for (let i = 0; i < n; i++) {
      const user = {
        userId: i,
        first_name: arrNames[i],
        gender: Math.random() < 0.5 ? 'male' : 'female',
        subscribe: makeSubscription(i),
      };
      arrUsers.push(user);
    }
  };

  // make array with subscriptions
  function makeSubscription(userId) {
    const subscriptions = [];
    const quantityOfSubscriptions = Math.round(Math.random() * 0.75 * n - 1);
    for (let i = 0; i <= quantityOfSubscriptions; i++) {
      const subscriber = Math.round(Math.random() * n);
      if (userId !== subscriber && !subscriptions.includes(subscriber)) {
        subscriptions.push(subscriber);
      }
    }
    return subscriptions;
  }
  await getNames(url);

  return arrUsers;
}

module.exports = generator;
