const express = require("express");
const router = express.Router();
const { Registration } = require("../model/Registration");

// Create a new mark
router.post("/", async (req, res) => {
  try {
    const mark = await Registration.create(req.body);
    res.status(201).json(mark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all marks
router.get("/", async (req, res) => {
  try {
    const marks = await Registration.find()
      .populate("student")
      .populate("subject");
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:roll_no/marks", async (req, res) => {
  try {
    const studentMarks = await Registration.find({
      roll_no: req.params.roll_no,
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
    const mark = await Registration.findById(req.params.id)
      .populate("roll_no")
      .populate("subject_id");
    if (!mark) throw new Error("Registration not found");
    res.json(mark);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/marks", async (req, res) => {
  const { title, obtainedMarks, totalMarks, registrationId } = req.body;

  try {
    let grade = "";
    let registration = await Registration.findById(registrationId);
    let obtainedMarksTotal = registration.marks.reduce(
      (acc, cur) => acc + cur.obtainedMarks,
      0
    );
    obtainedMarksTotal += obtainedMarks;
    let marksTotal = registration.marks.reduce(
      (acc, cur) => acc + cur.totalMarks,
      0
    );
    marksTotal += totalMarks;
    let percentage = (obtainedMarksTotal / marksTotal) * 100;

    if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 80 && percentage < 90) {
      grade = "B";
    } else if (percentage >= 70 && percentage < 80) {
      grade = "C";
    } else if (percentage >= 50 && percentage < 70) {
      grade = "D";
    } else {
      grade = "F";
    }
    registration = await Registration.findByIdAndUpdate(
      registrationId,
      {
        $push: { marks: { title, obtainedMarks, totalMarks } },
        grandTotal: parseFloat(percentage.toFixed(2)),
        grade,
      },
      { new: true }
    );
    // await registration.updateOne({ grade, grandTotal });
    res.json(registration);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update a mark by ID
router.patch("/:id", async (req, res) => {
  try {
    const mark = await Registration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!mark) throw new Error("Registration not found");
    res.json(mark);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Delete a mark by ID
router.delete("/:id", async (req, res) => {
  try {
    const mark = await Registration.findByIdAndDelete(req.params.id);
    if (!mark) throw new Error("Registration not found");
    res.json({ message: "Registration deleted" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
