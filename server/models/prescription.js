const mongoose = require('mongoose');
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
	image: { type: 'String', required: true },
    user: { type: Schema.Types.ObjectId,  ref: 'User', required: true },
	description: { type: 'String', required: true },
 	createdOn: { type: 'Date', default: Date.now, required: true },
    sharedWith: [{ type: Schema.Types.ObjectId,  ref: 'User' }],
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
