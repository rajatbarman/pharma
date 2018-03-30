const mongoose = require('mongoose');
const _ = require('lodash');
const { userTypes } = require('../constants');
const User = mongoose.model('User');
const PrescriptionViewRequest = mongoose.model('PrescriptionViewRequest');
const Prescription = mongoose.model('Prescription');

const { ObjectID } = mongoose;

module.exports = {
    getPatientDetails(req, res) {
        const { id } = req.params;
        const resp = {
            prescriptions: [],
            prescriptionViewRequests: [],
        };

        User.find({ _id: id }).exec()
            .then((user) => {
                if (!user) {
                    res.status(404).send({});
                    return Promise.reject();
                }
                return Prescription.find({ user }).populate('user').exec();
            })
            .then((prescriptions) => {
                resp.prescriptions = _.map(prescriptions, prescription => {
                    const { user, sharedWith, image } = prescription;
                    const { email, name } = user;
                    return {
                        id: prescription._id,
                        image,
                        sharedWith,
                        user: {
                            id: user._id,
                            email,
                            name
                        }
                    };
                });
                return PrescriptionViewRequest.find({ forPrescription: { $in: _.map(prescriptions, '_id') } }).exec();
            })
            .then((prescriptionViewRequests) => {
                resp.prescriptionViewRequests = prescriptionViewRequests;
                res.status(200).send(resp);
            });

    },

    getPatients(req, res) {
        const resp = {
            patients: []
        };

        let prescriptions;

        User.find({ type: userTypes.PATIENT }).exec()
            .then((patients) => {
                resp.patients = _.map(patients, patient => {
                    const { name, email } = patient;
                    return {
                        id: patient._id,
                        email,
                        name
                    };
                });

                return Prescription.find({}).exec();
            }, () => {
                res.status(500).send({});
                return Promise.reject();
            })
            .then((_prescriptions) => {
                prescriptions = _prescriptions;
                return PrescriptionViewRequest.find({}).exec();
            })
            .then((prescriptionViewRequests) => {
                resp.patients = _.map(resp.patients, (patient) => {
                    return {
                        ...patient,
                        prescriptions: _.map(_.filter(prescriptions, prescription => { return prescription.user.equals(patient.id) }), prescription => {
                            const { image, sharedWith, description } = prescription;
                            const o = {
                                id: prescription._id,
                                image,
                                sharedWith,
                                description,
                                requestStatus: {},
                            };

                            const filteredPrescriptionViewRequests = _.filter(prescriptionViewRequests, (prescriptionViewRequest) => {
                                return prescriptionViewRequest.forPrescription.equals(prescription._id)
                            });

                            if (_.size(filteredPrescriptionViewRequests)) {
                                const requestStatusByUserId = {};
                                _.each(filteredPrescriptionViewRequests, prescriptionViewRequest => {
                                    requestStatusByUserId[prescriptionViewRequest.byUser] = prescriptionViewRequest.status;
                                });
                                o.requestStatus = requestStatusByUserId;
                            }

                            return o;
                        })
                    };
                });
                res.status(200).send(resp);
            });
    }
};
