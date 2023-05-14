const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marks: [
    {
      title: {
        type: String,
        enum: ["Quiz", "Midterm", "Assignment", "Final"],
        // required: true
      },
      obtainedMarks: {
        type: Number,
        // required: true,
      },
      totalMarks: {
        type: Number,
        // required: true,
      },
    },
  ],
  grade: {
    type: String,
  },
  grandTotal:{
    type: Number,
  }
});
const Registration = mongoose.model("Registration", registrationSchema);
module.exports = { Registration };
