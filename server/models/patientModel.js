const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({

  
  Name: {
    type: String,
    required: true //validation:Required field
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  address: { 
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
  
  status: {
    type: String,
    default: "pending",
  },
  seenNotifications: {
    type: Array,
    default: [],
  },
  unseenNotifications: {
    type: Array,
    default: [],
  }
}, {
  timestamps: true,
});

const patient = mongoose.model("Patient", patientSchema);

module.exports = patient;
