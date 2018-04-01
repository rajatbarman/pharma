const { Router } = require('express');
const userController = require('../controllers/user');
const prescriptionViewRequestsController =  require('../controllers/prescriptionViewRequests');
const prescriptionsController = require('../controllers/prescriptions');
const authController = require('../controllers/auth');
const router = new Router();

router.route('/user-session-details').get(authController.getUserSessionDetails);

router.route('/login').post(authController.login);

router.route('/patient/:id').get(userController.getPatientDetails);

router.route('/patients').get(userController.getPatients);

router.route('/prescriptions').get(prescriptionsController.getPrescriptions);

router.route('/prescription-view-requests').get(prescriptionViewRequestsController.getPrescriptionViewRequests);

router.route('/prescription-view-requests/:id').patch(prescriptionViewRequestsController.updatePrescriptionViewRequest);

router.route('/prescription-view-requests').post(prescriptionViewRequestsController.addPrescriptionViewRequest);

module.exports = router;
