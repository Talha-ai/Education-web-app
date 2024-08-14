const express = require('express'); //web app framework for node.js
const path = require('path'); //module to handle file paths
// const methodOverride = require('method-override');  //middleware: provides support for
// HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// const User = require('./models/user')
const session = require('express-session'); //middleware to manage user sessions
// const passport = require('passport'); //an authentication middleware for node.js
// const LocalStrategy = require('passport-local'); //local strategy for passport, commonly used for username and password auth
// const flash = require('connect-flash')
const connectDB = require('./config/connectDB');
const cors = require('cors');

connectDB();

const app = express();

//middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(express.json()); //allows json request, fetch from client, allows to parse json inf from body
app.use(express.urlencoded({ limit: '300mb', extended: true })); //allows us to access/parses inf coming from forms
app.use(cors());

app.use(express.json({ limit: '300mb' }));


//setting up session management aka passport management
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// app.use(passport.initialize());
// app.use(passport.session()); //using passport with sessions

// passport.use(new LocalStrategy(User.authenticate())); //configure passport to use the local strategy, User=model

//Serialize the user inf to store in the session
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
//Deserialize the user inf from the session
// passport.deserializeUser((_id, done) => {
//   User.findById(_id, (err, user) => {
//     if (err) {
//       done(null, false, { error: err });
//     } else {
//       done(null, user);
//     }
//   });
// });

// app.get('/fakeuser', async (req, res) => {
//   const newuser = new User({ email: 'ct@gmail.com', username: 'ctt' });
//   const newUser = await User.register(newuser, 'chiken');
//   res.send(newUser);
//   console.log(req.user)
// })

// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

//Setting up method override with deafult query param (_method)
// app.use(methodOverride('_method'));

// app.set("view engine", "ejs"); //set EJS as the view engine
// app.set('views', path.join(__dirname, '/views')); //set the views dir to the views folder of current directory


// app.use("/users", require("./routes/userRoutes")); 


app.use("/auth", require("./routes/authRoutes"));
app.use("/upload", require("./routes/upload"));
app.use("/", require("./routes/courses"));
app.use("/", require("./routes/userRoutes"));
app.use("/educator", require("./routes/educatorRoutes"));

// app.use(express.json({ limit: '500mb' }));
// app.use(express.urlencoded({ limit: '500mb', extended: true }));

// app.get('/test', (req, res) => {
//   console.log('Session ID:', req.sessionID);
//   console.log('Session Data:', req.session);
//   res.send('Check console for session information');\\
// });


//Server setup and listen
const PORT = process.env.PORT || 7000; //Define port for the server using env var or default to 7000
app.listen(PORT, () => console.log(`Server started on port ${PORT} `)); //start the server and listen on specified port