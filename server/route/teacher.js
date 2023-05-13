const express = require("express");
const router = express.Router();
const { Teacher } = require("../model/Teacher");

// GET all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET a single teacher by id
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      teacher_id: req.params.id,
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE a new teacher
router.post("/", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.json(savedTeacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE an existing teacher
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { teacher_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a teacher
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ teacher_id: req.params.id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
