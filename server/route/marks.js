const express = require("express");
const router = express.Router();
const { Mark } = require("../model/Marks");

// Create a new mark
router.post("/", async (req, res) => {
  try {
    const mark = await Mark.create(req.body);
    res.status(201).json(mark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all marks
router.get("/", async (req, res) => {
  try {
    const marks = await Mark.find()
      .populate("student_id")
      .populate("subject_id");
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:student_id/marks", async (req, res) => {
    try {
      const studentMarks = await Mark.find({
        student_id: req.params.student_id,
      }).populate("subject_id");
      res.json(studentMarks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
// Get a single mark by ID
router.get("/:id", async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id)
      .populate("student_id")
      .populate("subject_id");
    if (!mark) throw new Error("Mark not found");
    res.json(mark);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update a mark by ID
router.patch("/:id", async (req, res) => {
  try {
    const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!mark) throw new Error("Mark not found");
    res.json(mark);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Delete a mark by ID
router.delete("/:id", async (req, res) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    if (!mark) throw new Error("Mark not found");
    res.json({ message: "Mark deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
