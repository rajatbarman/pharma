const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: 'String', required: true },
	name: { type: 'String', required: true },
  	type: { type: 'String', enum: ['doctor', 'pharmacist', 'patient'] },
  	createdOn: { type: 'Date', default: Date.now, required: true },
  	password: { type: 'String', required: true },
});

module.exports = mongoose.model('User', userSchema);
