"use strict ";

const express = require("express");
const stamper = require("./middleware/stamper");
const notFound= require('./handlers/404');
const errorHandler = require('./handlers/500')
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// test server
app.get("/", (req, res) => {
  res.status(200).send("the server is live");
});

// make a stamper at middleware
app.get("/data", stamper, (req, res) => {
  const objectReturn = {
    yes: "true",
    no: "false",
    Time: req.timestamp,
  };
  res.status(200).json(objectReturn);
});

// try error message with next
app.get('/bad', (req, res, next)=>{
    throw new Error('that is a bad path ERROR')
})

// middle wares 
app.use('*', notFound);
app.use(errorHandler)



function start() {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
}

module.exports = { app, start };
