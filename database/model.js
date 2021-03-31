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

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
