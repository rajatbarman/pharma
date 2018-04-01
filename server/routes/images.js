const { Router } = require('express');
const router = new Router();
const prescriptionsController = require('../controllers/prescriptions');

router.route('/prescriptions/:id').get(prescriptionsController.getPrescriptionImage);

module.exports = router;
