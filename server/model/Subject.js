const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    // required: true,
  },
});
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = { Subject };
