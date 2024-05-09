const express = require('express');
const router = express.Router();
const { getAppointmentsController, approveAppointmentController, rejectAppointmentController } = require('../controllers/appManagerController');

router.get('/get-app', getAppointmentsController);
router.post('/approve/:id', approveAppointmentController);
router.post('/reject/:id', rejectAppointmentController);

module.exports = router; 
