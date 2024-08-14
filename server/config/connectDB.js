const mongoose = require('mongoose'); //an ODM(object data modeling) library for MongoDB and node.js

const connectDB = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/educationApp') //connect to MongoDB db named educationApp, connect returns a promise
    .then(() => {
      console.log('MONGO CONNECTION OPEN');
    })
    .catch(err => {
      console.log('ERROR!!');
      console.log(err);
    })
}

module.exports = connectDB;
