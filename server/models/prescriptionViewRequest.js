const mongoose = require('mongoose');
const { prescriptionRequestStatus } = require('../constants');
const { Schema } = mongoose;

const requestSchema = new Schema({
    status: {
      type: 'Number',
      enum: [prescriptionRequestStatus.REJECTED, prescriptionRequestStatus.PENDING, prescriptionRequestStatus.APPROVED],
      default: prescriptionRequestStatus.PENDING,
      required: true
    },
    byUser: { type: Schema.Types.ObjectId,  ref: 'User', required: true },
    forPrescription: { type: Schema.Types.ObjectId,  ref: 'Prescription', required: true },
    createdOn: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('PrescriptionViewRequest', requestSchema);
