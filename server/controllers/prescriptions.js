const _ = require('lodash');
const mongoose = require('mongoose');
const Prescription = mongoose.model('Prescription');

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
    }
};
