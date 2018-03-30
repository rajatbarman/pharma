const _ = require('lodash');
const mongoose = require('mongoose');
const PrescriptionViewRequest = mongoose.model('PrescriptionViewRequest');
const Prescription = mongoose.model('Prescription');

module.exports = {
    addPrescriptionViewRequest(req, res) {
        const { forPrescription } = req.body;
        const { user } = req.session;

        PrescriptionViewRequest.create({ forPrescription, byUser: user.id })
            .then((error) => {
                res.status(200).send({});
            }, () => {
                res.status(500).send({});
            });
    },

    updatePrescriptionViewRequest(req, res) {
        const { status } = req.body;
        const { id } = req.params;

        if (_.isUndefined(status)) {
            res.status(400).send({});
            return;
        }

        PrescriptionViewRequest.findOne({ _id: id }).exec()
            .then(prescriptionViewRequest => {
                if (status !== 1)
                    return Promise.resolve();

                return Prescription.update({
                    _id: prescriptionViewRequest.forPrescription
                }, {
                    $push: { sharedWith: prescriptionViewRequest.byUser }
                });
            })
            .then(prescription => {
                return PrescriptionViewRequest.update({
                    _id: id
                }, {
                    status
                })
            })
            .then(() => {
                res.status(200).send({});
            }, () => {
                res.status(500).send({});
            });

    },

    getPrescriptionViewRequests(req, res) {
        const { user } = req.session;

        if (!user) {
            res.status(401).send({});
            return;
        }

        Prescription.find({ user: user.id }).exec()
            .then(prescriptions => {
                return PrescriptionViewRequest
                    .find({ forPrescription: { $in: _.map(prescriptions, '_id') }, status: 0 })
                    .populate('byUser')
                    .exec()
            })
            .then(prescriptionViewRequests => {
                prescriptionViewRequests = _.map(prescriptionViewRequests, prescriptionViewRequest => {
                    const { status, forPrescription, byUser } = prescriptionViewRequest;
                    return {
                        id: prescriptionViewRequest._id,
                        status,
                        forPrescription,
                        byUser: {
                            id: byUser._id,
                            email: byUser.email,
                            name: byUser.name,
                            type: byUser.type,
                        }
                    };
                });
                res.status(200).send({ prescriptionViewRequests });
            }, (error) => {
                res.status(500).send({ error });
            });
    }
};
