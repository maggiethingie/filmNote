const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  entry_id: {
    type: String,
    unique: true
  },
  user_id: Number,
  entry: String,
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String
},
{
  timestamps: true
});

const userSchema = mongoose.Schema({
  user_id: Number,
  user_email: String,
  user_name: String,
  user_picURL: String
});

const Entry = mongoose.model('Entry', entrySchema);
const User = mongoose.model('User', userSchema);

module.exports = { Entry, User };
