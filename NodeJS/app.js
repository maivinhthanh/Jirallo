const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

const app = express(); 


app.use(bodyParser.urlencoded({extended: true})); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/project', projectRoutes);


app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    //'mongodb+srv://tuyetnhi:tuyetnhi10081998@cluster0-uvzix.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
    'mongodb+srv://tuyetnhi:tuyetnhi10081998@studytogether-2fwoo.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
