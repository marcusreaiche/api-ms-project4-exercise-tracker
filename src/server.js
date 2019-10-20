// Node modules
const dotenv = require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const app = express();

// Custom modules
const UserController = require("./controllers/UserController");
const ExerciseController = require("./controllers/ExerciseController");

const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving the public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
// Users
app.get("/api/exercise/users", UserController.index);
app.post("/api/exercise/new-user", UserController.store);
//Exercises
app.post("/api/exercise/add", ExerciseController.store);
app.get("/api/exercise/log", ExerciseController.show);
// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'});
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt')
    .send(errMessage);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
