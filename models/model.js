var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var studentSchema = new Schema({
	surname: String,
	firstname: String,
	level: String,
	matric_number: String,
	dateAdded : { type: Date, default: Date.now },
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Student',studentSchema);