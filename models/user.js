const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  subscribe: {
    type: Array,
    default: [],
  },
  userId: {
    type: Number,
    required: true,
  },
});

const User = model('user', userSchema); // creating model

module.exports = User;
