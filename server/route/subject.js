const express = require('express');
const router = express.Router();
const { Subject } = require("../model/Subject");

router.post('/', async (req, res) => {
    try {
      const subject = await Subject.create(req.body);
      res.status(201).json(subject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET all subjects
router.get('/subjects', async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
