const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educatorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true
  },
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
