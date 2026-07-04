const express = require('express');
const mongoose = require('mongoose')
const apiRoutes = require('./routes')
//application initialization
const app = express();

//application configuration bindings
app.use(express.json());

//Database connection


const port = 3000;

// API Layer Route entry hook
app.use('/', apiRoutes)

//default error handler
// function errorHandler(err, req, res, next) {
//     if(res.headersSent) {
//         return next(err)
//     }
//     res.status(500).json({error: err})
// }

module.exports = app;