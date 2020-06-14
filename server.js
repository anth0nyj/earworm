// Dependencies
const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const morgan    = require('morgan');
const session   = require('express-session');
const bcrypt    = require('bcrypt');
// const ngEmbed  = require('ng-embed');
require('pretty-error').start();

// Configuration
const PORT      = process.env.PORT || 3000;
const mongoURI  = process.env.MONGODB_URI || 'mongodb://localhost/earworm'

// Database
mongoose.connect(mongoURI, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// Controllers
const sessionsController  = require('./controllers/sessions');
const usersController     = require('./controllers/users');
const postsController     = require('./controllers/posts');
const commentsController  = require('./controllers/comments');

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: "There's always money in the banana stand.",
  resave: true,
  saveUninitialized: false
  // Leaving maximum login time out for now.
  // maxAge: 2592000000
}));
app.use('/users', usersController);
app.use('/session', sessionsController);
app.use('/posts', postsController);
app.use('/comments', commentsController);

// Listener
app.listen(PORT, () => {
  console.log("==========================================");
  console.log("Earworm App is running on port: ", PORT);
  console.log("==========================================");
})
