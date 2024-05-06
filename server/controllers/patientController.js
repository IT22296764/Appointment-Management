const patientModel = require("../models/patientModel");

const getpatientController = async (_req, _res, _next) => {
  try {
    const patients = await patientModel.find();
    _res.json(patients);
  } catch (error) {
    console.error(error);
    _res.status(500).json({ message: "Internal server error" });
  }
};

const addAppointmentController = async (_req, _res) => {
  try {
    const newPatient = new patientModel(_req.body);
    await newPatient.save();
    _res.status(201).json({ message: "Appointment created successfully", patient: newPatient });
  } catch (error) {
    console.error(error);
    _res.status(400).json({ message: "Error", error });
  }
};

const editPatientController = async (_req, _res) => {
  try {
    const { id } = _req.params;
    const updatedPatient = await patientModel.findByIdAndUpdate(id, _req.body, { new: true });
    _res.status(200).json({ message: "Appointment updated successfully", patient: updatedPatient });
  } catch (error) {
    console.error(error);
    _res.status(400).json({ success: false, message: "Appointment update issue", error });
  }
};

const deletepatientController = async (_req, _res) => {
  try {
    const { id } = _req.params;
    await patientModel.findByIdAndDelete(id);
    _res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    _res.status(400).json({ message: "Error deleting appointment", error });
  }
};

module.exports = { getpatientController, addAppointmentController, editPatientController, deletepatientController }; 
