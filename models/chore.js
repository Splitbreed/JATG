var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChoreSchema = new Schema({
  name: String,
  urgent: Boolean,
  description: String
});

module.exports = mongoose.model('Chore', ChoreSchema)
