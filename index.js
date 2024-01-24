// Importing necessary modules from Node.js and npm
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// Importing routers from different files to handle specific routes
import welcomePageRouter from './routes/welcomePageRouter.js';
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js'; 
import homePageRouter from './routes/homePageRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import menuPageRouter from './routes/menuPageRouter.js';
import addTaskSaveListRouter from './routes/addSaveTaskRouter.js';
import deleteListRouter from './routes/deleteListRouter.js';
import editTaskInSavedList from './routes/editTaskInSavedList.js';
//this deletes a task when creating a list before it saved
import deleteTaskRouter from './routes/deleteTaskRouter.js';
import editSavedTaskMenuList from './routes/editTaskModalRouter.js';
import authGoogleRouter from './routes/authGoogleRouter.js';
import addTaskToSavedListRouter from './routes/addTaskToListRouter.js';

// Importing models and database connection
import db from './database/connection.js';
import userInfo from './database/models/User.js';
import flash from 'express-flash';
//importing configuration passport function
import configurePassport from './configPassport/passportConfig.js';
// Creating an instance of Express to set up the server
const app = express();
const PORT = process.env.PORT || 5000;
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware setup
app.use(express.static('public')); // Serving static files from the 'public' directory

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (from forms, etc.)

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('routes', path.join(__dirname, 'routes'));
app.set('database', path.join(__dirname, 'database'));
app.set('configPassport', path.join(__dirname, 'configPassport'));
app.set('/', path.join(__dirname, '/'));

app.set('view engine', 'ejs'); // Setting EJS as the template engine for rendering views
//

//callimng the function with the setup for passport and sessions(user authentications and all that)
configurePassport(app, userInfo);

//
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error to check');
});


// Routing
// Using the imported routers for handling specific paths
app.use(flash());
app.use(welcomePageRouter);
app.use(registerRouter); 
app.use(loginRouter);
app.use(homePageRouter);
app.use(addTaskSaveListRouter);
app.use(menuPageRouter);
app.use(deleteListRouter);
app.use(editTaskInSavedList);
app.use(addTaskToSavedListRouter);
app.use(deleteTaskRouter);
app.use(editSavedTaskMenuList);
app.use(authGoogleRouter);
app.use(logoutRouter);
// Starting the server


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

