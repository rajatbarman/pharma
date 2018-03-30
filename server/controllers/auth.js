const mongoose = require('mongoose');
const _ = require('lodash');
const User = mongoose.model('User');

module.exports = {
    login(req, res) {
        const { email, password } = req.body;
        User.findOne({ email, password }).exec()
            .then((user) => {
                if (user && !_.isEmpty(user)) {
                    const { name, email, type } = user;

                    const userData = {
                        id: user._id,
                        email,
                        name,
                        type,
                    };

                    req.session.user = userData;

                    res.status(200).send({
                        user: userData,
                        isAuthValid: true,
                    });
                } else {
                    res.status(401).send({
                        user: {},
                        isAuthValid: false,
                    });
                }
            });
    },

    getUserSessionDetails(req, res) {
        if (!req.session || !req.session.user) {
            res.status(200).send({ isAuthValid: false, user: {} });
        } else {
            res.status(200).send({ isAuthValid: true, user: req.session.user });
        }
    }
}
