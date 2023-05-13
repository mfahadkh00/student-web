const express = require("express");
const router = express.Router();
const { Attendance } = require("../model/Attendance");
const {Student} = require('../model/Student');
const {Subject} = require('../model/Subject');

// Route to create attendance record
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).send(attendance);
  } catch (err) {
    res.status(400).send(err);
  }
});

//add batch attendance
router.post('/batch', async (req, res) => {
    try {
      // Find the subject by ID
      const subject = await Subject.findById(req.body.subject_id);
      if (!subject) {
        return res.status(400).json({ message: "Subject not found" });
      }
  
      for (const roll_number of req.body.present) 
      {
        const student = await Student.findOne({ roll_number: roll_number });
        if (!student) {
          console.log(`Student with roll_number ${roll_number} not found`);
          continue;
        }
  
        // Check if attendance record already exists for this student and date
        const existingAttendance = await Attendance.findOne({ student_id: student._id, subject_id: subject._id, date: req.body.date });
        if (existingAttendance) {
          console.log(`Attendance record already exists for student ${student.name} on ${req.body.date}`);
          continue;
        }
  
        // Create new attendance record
        const attendance = new Attendance({
          student_id: student._id,
          subject_id: subject._id,
          date: req.body.date,
          is_present: true
        });
        await attendance.save();
        console.log(`Attendance record created for student ${student.name} on ${req.body.date}`);
      }
  
      // Create attendance records for all absent students
      for (const roll_number of req.body.absent) {
        const student = await Student.findOne({ roll_number: roll_number });
        if (!student) {
          console.log(`Student with roll_number ${roll_number} not found`);
          continue;
        }
  
        // Check if attendance record already exists for this student and date
        const existingAttendance = await Attendance.findOne({ student_id: student._id, subject_id: subject._id, date: req.body.date });
        if (existingAttendance) {
          console.log(`Attendance record already exists for student ${student.name} on ${req.body.date}`);
          continue;
        }
  
        // Create new attendance record
        const attendance = new Attendance({
          student_id: student._id,
          subject_id: subject._id,
          date: req.body.date,
          is_present: false
        });
        await attendance.save();
        console.log(`Attendance record created for student ${student.name} on ${req.body.date}`);
      }
  
      res.status(200).json({ message: "Attendance records created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// Route to get all attendance records
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find({});
    res.send(attendance);
  } catch (err) {
    res.status(500).send();
  }
});

// Route to get attendance record by id
router.get("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (err) {
    res.status(500).send();
  }
});

// GET attendance by subject and date
router.get('/date-sub/:subject/:date', async (req, res) => {
  try {
    const subjectId = req.params.subject;
    const date = new Date(req.params.date);

    const attendance = await Attendance.find({
      subject_id: subjectId,
      date: date,
    }).populate('student_id', 'roll_number name');

    res.status(200).json({ attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET attendance by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const subjectId = req.params.subject;
    const date = new Date(req.params.date);

    const attendance = await Attendance.find({
      subject_id: subjectId,
    }).populate('student_id', 'roll_number name');

    res.status(200).json({ attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET attendance by date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);

    const attendance = await Attendance.find({
      date: date,
    }).populate('student_id', 'roll_number name').populate('subject_id', 'name');

    res.status(200).json({ attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Route to update attendance record by id
router.patch("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route to delete attendance record by id
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
