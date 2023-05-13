const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
});
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = { Teacher };
