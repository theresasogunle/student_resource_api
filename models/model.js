var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	surname: String,
	firstname: String,
	level: String,
	matric_number: String,
	dateAdded : { type: Date, default: Date.now },
})

module.exports = mongoose.model('Student',studentSchema);