const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'educator'],
    default: 'student',
  }
});

// userSchema.pre('remove', async function (next) {
//   try {
//     await Task.deleteMany({ user: this._id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.plugin(passportLocalMongoose); //unique other methods
const User = mongoose.model('User', userSchema);

module.exports = User;