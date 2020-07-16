const cors = require('cors');

//Add cors to the server
app.options('*', cors());

//import middle wares for configuration into app.js
const requestDispatcher = require('./src/interface/middlewares/requestDispatcher');

//Others Dependencies of file.
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const responseHelper = require('./src/interface/helpers/response-helper');

//Import Routes files
const { usersRouter, authenticationRouter,bookmarkRouter } = require('./src/interface/routes/user_service');
const noParameterRequest = require('./src/interface/middlewares/no-parameter-request');
const { error } = require('console');
const { newsRouter } = require('./src/interface/routes/news_service');

//Constants variables iniatialiazation 
const app = express();
const APIVERSION = `/api/v4.1`

//Inject Middlewares into the Server 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(requestDispatcher());
// app.use(noParameterRequest());

//Inject Routes
app.use(`${APIVERSION}/user`, passport.authenticate('jwt', { session: false }), usersRouter);
app.use(`${APIVERSION}/user/bookmarks`, passport.authenticate('jwt', { session: false }), bookmarkRouter);
app.use(`${APIVERSION}/auth`, authenticationRouter);
app.use(`${APIVERSION}/news`, passport.authenticate('jwt', { session: false }), newsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // only providing error in development
  if (req.app.get('env') === 'development') {
    console.log('hello this is development');
    // render the error page
    console.log(`\n\n\ncatch it from error handler \n\n\n`, err);
    res.status(err.status || 500);
    res.json(responseHelper.serverError(res.statusCode, err.message, JSON.stringify(err.stack)));
  }

});

process.on('unhandledRejection', err => {
  console.log(`\n\n\ncatch it \n\n\n`, err);
})

module.exports = app;
