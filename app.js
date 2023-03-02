const express = require('express');
const logger = require('morgan'); // logger
const cors = require('cors');
const userRouter = require('./routes/api/users'); // router import
const generator = require('./util/generator');
require('dotenv').config({ path: './.env' }); // import dotenv - npm package for env variables

const app = express();
app.use(cors());
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'; // logger settings

app.use(logger(formatsLogger)); // use logger for information input
app.use(express.json());

app.use('/api', userRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err; //  handle errors
  res.status(status).json({ message });
});

module.exports = app;
