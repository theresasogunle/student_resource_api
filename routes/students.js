var mongo = require('mongodb');

// Connect to the database before starting the application server.

var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds123410.mlab.com:23410/heroku_2snqp2d4');





// our db model
var Person = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function(req, res) {
    
    console.log("main route requested");

    var data = {
        status: 'OK',
        message: 'Welcome to the itpeeps-map v1 API'
    }

    // respond back with the data
    res.json(data);

}

/**
 * POST '/api/create'
 * Receives a POST request of the new user and location, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.create = function(req,res){

    console.log(req.body);

    // pull out the name and location
    var surname = req.body.surname;
    var firstname = req.body.firstname;
    var matric_number = req.body.matric_number;
    var level = req.body.level;
   

      var person = Person({
        surname: name,
        firstname: firstname,
        matric_number: matric_number,
        level:level
        
      });

      // now, save that person to the database
        // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save      
      person.save(function(err,data){
        // if err saving, respond back with error
        if (err){
            var jsonData = {status:'ERROR', message: 'Error saving person'};
            return res.json(jsonData);
        }

        console.log('saved a new person!');
        console.log(data);

        // now return the json data of the new person
        var jsonData = {
            status: 'OK',
            person: data
        }

        return res.json(jsonData);

      })
 
}

/**
 * GET '/api/get/:id'
 * Receives a GET request specifying the user to get
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

exports.getOne = function(req,res){

    var requestedId = req.param('id');

    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findById(requestedId, function(err,data){

        // if err or no user found, respond with error 
        if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find that person'};
         return res.json(jsonData);
    }

    // otherwise respond with JSON data of the user
    var jsonData = {
        status: 'OK',
        person: data
    }

    return res.json(jsonData);
    
    })
}

/**
 * GET '/api/get'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */

exports.getAll = function(req,res){

    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
    Person.find(function(err, data){
        // if err or no users found, respond with error 
        if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find people'};
        return res.json(jsonData);
    }

    // otherwise, respond with the data 

    var jsonData = {
        status: 'OK',
        people: data
    }   

    res.json(jsonData);

    })

}

/**
 * POST '/api/update/:id'
 * Receives a POST request with data of the user to update, updates db, responds back
 * @param  {String} req.param('id'). The userId to update
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.update = function(req,res){

    var requestedId = req.param('id');

    // pull out the name and location
    
    var surname = req.body.surname;
    var firstname = req.body.firstname;
    var matric_number = req.body.matric_number;
    var level = req.body.level;
   

    

      var dataToUpdate = {
        surname: name,
        firstname: firstname,
        matric_number: matric_number,
        level:level
        
      };

      // now, update that person
        // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
      Person.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
        // if err saving, respond back with error
        if (err){
            var jsonData = {status:'ERROR', message: 'Error updating person'};
            return res.json(jsonData);
        }

        console.log('updated the person!');
        console.log(data);

        // now return the json data of the new person
        var jsonData = {
            status: 'OK',
            person: data
        }

        return res.json(jsonData);

      })

    });

}

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the user to delete
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

exports.remove = function(req,res){

    var requestedId = req.param('id');

    // Mongoose method, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
    Person.findByIdAndRemove(requestedId,function(err, data){
        if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find that person to delete'};
        return res.json(jsonData);
        }

        // otherwise, respond back with success
        var jsonData = {
            status: 'OK',
            message: 'Successfully deleted id ' + requestedId
        }

        res.json(jsonData);

    })

}