const express = require("express");
const router = express.Router();
const { Student } = require("../model/Student");
const { connection } = require("mongoose");

router.post("/collections", async (req, res) => {
  const { name } = req.body;
  try {
    const collection = await connection.db.createCollection(name);
    res.status(201).json({ message: `Collection ${name} created` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({
      roll_number: req.params.id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a specific student by ID
router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { roll_number: req.params.id },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      roll_number: req.params.id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
