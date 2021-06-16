const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chillingSchema = new Schema({
  title: { type: String, required: true },
  netflixid: { type: Number, required: true },
  username: { type: String, required: true },
  pass: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  note: { type: String, required: true }  
}, {
  timestamps: true,
});

const Chilling = mongoose.model('Chilling', chillingSchema);

module.exports = Chilling;