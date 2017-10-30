var mongo = require('mongodb');

// Connect to the database before starting the application server.

var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds123410.mlab.com:23410/heroku_2snqp2d4');
/*
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017||process.env.MONGODB_URI, {auto_reconnect: true});
//new database
db = new Db('studentdb', server);
//database authentication

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'studentdb' database");
        db.collection('students', {strict:true}, function(err, collection) {
            if (err) {
                console.log("");
                
            }
        });
    }
});

*/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving student with an id of  : ' + id);
    db.collection('students', function(err, collection) {
       collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('students', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addStudent = function(req, res) {
    var student = req.body;
    console.log('Adding student: ' + JSON.stringify(student));
    db.collection('students', function(err, collection) {
        collection.insert(student, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateStudent = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating student: ' + id);
    console.log(JSON.stringify(student));
    db.collection('students', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, student, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating student record: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(student);
            }
        });
    });
}

exports.deleteStudent= function(req, res) {
    var id = req.params.id;
    console.log('Deleting student: ' + id);
    db.collection('students', function(err, collection) {
        collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}