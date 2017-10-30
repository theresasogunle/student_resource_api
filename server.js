var express = require("express");
var app = express();
var student=require('./routes/students');
var mongo = require('mongodb');


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