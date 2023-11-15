// Importing necessary modules from Node.js and npm
// Importing the Express framework for building web applications
import express from 'express';
import 'dotenv/config';
import passport from 'passport';
// Importing express-session to handle sessions
import session from 'express-session';

// Importing routers from different files to handle specific routes
// 
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js'; 
import homePageRouter from './routes/homePageRouter.js';
import logoutRouter from './routes/logoutRouter.js'

// Importing models and database connection
import db from './database/connection.js';
import userInfo from './database/models/User.js';

//importing configuration passport function
import configurePassport from './configPassport/passportConfig.js';
// Creating an instance of Express to set up the server
const app = express();
const PORT = process.env.LISTENING_PORT;

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (from forms, etc.)

app.use(express.static('public')); // Serving static files from the 'public' directory

app.set('view engine', 'ejs'); // Setting EJS as the template engine for rendering views

//callimng the function with the setup for passport and sessions
configurePassport(app, userInfo);
// Routing
// Home route
app.get('/', (req, res) => {
  res.render('welcomePage'); // Rendering the welcome page for the root route
});

// Using the imported routers for handling specific paths
app.use(registerRouter); 
app.use(loginRouter);
app.use(homePageRouter); 

app.use(logoutRouter);
// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
