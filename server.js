var express = require("express");
var app = express();
var student=require('./routes/students');
var mongo = require('mongodb');
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
app.configure(function () {
    app.use(express.logger('dev'));     
    app.use(express.bodyParser());
});

app.get('/students', student.findAll);
app.get('/students/:id', student.findById);
app.post('/students', student.addStudent);
app.put('/students/:id', student.updateStudent);
app.delete('/students/:id', student.deleteStudent);

app.listen(process.env.PORT || 4000)
console.log('We are live on port 4000');