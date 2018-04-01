const _ = require('lodash');
const path = require('path');
const mongoose = require('mongoose');
const Prescription = mongoose.model('Prescription');
const { userTypes } = require('../constants');

module.exports = {
    getPrescriptions(req, res) {
        const { forPrescription } = req.body;

        if (!req.session) {
            res.status(401).send({
                message: 'Unauthorized'
            });
            return;
        }

        const { id } = req.session.user;

        Prescription.find({ user: id }).populate('sharedWith').exec()
            .then((prescriptions) => {
                prescriptions = _.map(prescriptions, prescription => {
                    let { sharedWith, description, image } = prescription;
                    sharedWith = _.map(sharedWith, user => {
                        const { email, type, name } = user;
                        return {
                            id: user._id,
                            email,
                            type,
                            name
                        };
                    });
                    return {
                        id: prescription._id,
                        sharedWith,
                        description,
                        image
                    };
                });

                res.status(200).send({ prescriptions });
            }, () => {
                res.status(500).send({})
            });
    },

    getPrescriptionImage(req, res) {
        const { id } = req.params;

        if (!req.session.user)
            res.status(401).send({});

        const { user } = req.session;

        Prescription.findOne({ _id: id }).exec()
            .then((prescription) => {
                let hasAccess = false;

                if (user.type === userTypes.PATIENT) {
                    hasAccess = true;
                }

                if (!hasAccess) {
                    _.each(prescription.sharedWith, userId => {
                        if (userId.equals(user.id)) {
                            hasAccess = true;
                            return false;
                        }
                    });
                }

                if (hasAccess) {
                    res.sendFile(path.resolve(__dirname + '/../../client/assets/images/prescriptions/' + prescription.image));
                } else {
                    res.status(403).send({});
                }
            }, () => {
                res.status(403).send({});
            });
    }
};
