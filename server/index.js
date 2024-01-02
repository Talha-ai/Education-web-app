const express = require('express'); //web app framework for node.js
const path = require('path'); //module to handle file paths
const methodOverride = require('method-override');  //middleware: provides support for
// HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

const mongoose = require('mongoose'); //an ODM(object data modeling) library for MongoDB and node.js
const session = require('express-session'); //middleware to manage user sessions
const passport = require('passport'); //an authentication middleware for node.js
const LocalStrategy = require('passport-local'); //local strategy for passport, commonly used for username and password auth
const User = require("./models/user")
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/educationApp') //connect to MongoDB db named educationApp, connect returns a promise
  .then(() => {
    console.log('MONGO CONNECTION OPEN');
  })
  .catch(err => {
    console.log('ERROR!!');
    console.log(err);
  })

//middleware setup

app.use(express.json()); //allows json request, fetch from client, allows to parse json inf from body
app.use(express.urlencoded({ extended: true })); //allows us to access/parses inf coming from forms
// app.use(flash());  

//setting up session management
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); //using passport with sessions

passport.use(new LocalStrategy(User.authenticate())); //configure passport to use the local strategy, User=model

//Serialize the user inf to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserialize the user inf from the session
passport.deserializeUser(async (id, done) => {
  done(null, await User.findById(id))
})

//Setting up method override with deafult query param (_method)
app.use(methodOverride('_method'));

app.set("view engine", "ejs"); //set EJS as the view engine
app.set('views', path.join(__dirname, '/views')); //set the views dir to the views folder of current directory

app.get("/", async (req, res) => {
  res.render('home');
})

app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//Server setup and listen
const PORT = process.env.PORT || 7000; //Define port for the server using env var or default to 7000
app.listen(PORT, () => console.log(`Server started on port ${PORT} `)); //start the server and listen on specified port