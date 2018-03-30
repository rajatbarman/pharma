const mongoose = require('mongoose');
const User = mongoose.model('User');
const Prescription = mongoose.model('Prescription');
const { userTypes } = require('./constants');

function dummyPatients() {
    const arr = [];
    for (let i=0; i<5; i++) {
        const patientNames = ['Raj', 'Pankaj', 'Jayant', 'Rohit', 'Abhishek'];
        arr.push(new User({
            type: userTypes.PATIENT,
            email: `patient${i+1}@pharma.com`,
            password: '123456',
            name: patientNames[i],
        }));
    }
    return arr;
}

function dummyPrescriptions(users) {
    const arr = [];
    for (i=1; i<=10; i++) {
        const userIndex = (Math.ceil(i/2)) - 1;
        arr.push(new Prescription({
            user: users[userIndex],
            image: `p${i}.jpg`,
            description: `This is prescription #${i} for ${users[userIndex].name}`
        }));
    }
    return arr;
}


function populateUsers() {
    return new Promise(function(resolve, reject) {
        User.count().exec((err, count) => {
            if (count > 0) {
                return resolve();
            }

            const doctor = new User({ type: userTypes.DOCTOR, email: 'doctor@pharma.com', password: '123456', name: 'Ajay' });
            const pharmacist = new User({ type: userTypes.PHARMACIST, email: 'pharmacist@pharma.com', password: '123456', name: 'Saurabh' });

            User.create([doctor, pharmacist, ...dummyPatients()], (error) => {
                if (!error) {
                    resolve();
                } else {
                    reject();
                    console.log('Something went wrong while populating users.');
                }
            });
        });
    })
}

function populatePrescriptions() {
    return new Promise(function(resolve, reject) {
        Prescription.count().exec((err, count) => {
            if (count > 0) {
                return resolve();
            }

            User.find({ type: userTypes.PATIENT }).exec((error, users) => {
                Prescription.create(dummyPrescriptions(users), (error) => {
                    if (error) {
                        reject();
                        console.log('Something went wrong while population prescriptions.');
                    } else {
                        resolve();
                    }
                });
            });
        });
    })
}

module.exports = function() {
    populateUsers()
        .then(function() {
            populatePrescriptions();
        });
}
