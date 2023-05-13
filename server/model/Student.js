const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  roll_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
});
const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };
