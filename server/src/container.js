const { createContainer, asValue, asFunction,asClass } = require('awilix');
const httpErrors = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./interface/routes');
const users = require('./interface/routes/users');

const container = createContainer();

container.register({
    createError: asValue(httpErrors),
    express: asClass(express),
    cookieParser: asFunction(cookieParser).singleton(),
    indexRouter: asFunction(routes).singleton(),
    usersRouter: asFunction(users).singleton()
});

module.exports = container;

// const container = require('./src/container');
// const { createError, express, cookieParser, indexRouter, usersRouter } = container
//   .resolve('createError', 'express', 'cookieParser', 'indexRouter', 'usersRouter');