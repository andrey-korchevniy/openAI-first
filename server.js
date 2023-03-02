const { connect } = require('mongoose');
const app = require('./app');
const { MONGO_URL, PORT } = process.env;

// connecting to DB
connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1); // close all active processes (1 - close undefined errors)
  });
