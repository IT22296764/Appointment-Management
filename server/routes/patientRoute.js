const express = require('express');
const router = express.Router();
const { getpatientController, addAppointmentController, editPatientController, deletepatientController } = require('../controllers/patientController');

router.get('/get-appointment', getpatientController);
router.post('/add-appointment', addAppointmentController);
router.put('/edit-appointment/:id', editPatientController);
router.delete('/delete-appointment/:id', deletepatientController);


module.exports = router;
