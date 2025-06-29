const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const { authenticate } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.post('/', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const { question, options } = req.body;
    const formattedOptions = options.map(text => ({ text }));
    const poll = new Poll({
      question,
      options: formattedOptions,
      createdBy: req.user.id
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create poll' });
  }
});

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().populate('createdBy', 'username');
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get polls' });
  }
});

// GET /api/polls/:id → Get single poll
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate('createdBy', 'username');
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Error getting poll' });
  }
});

// DELETE /api/polls/:id → Admin or creator deletes poll
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    const isAdmin = req.user.role === 'admin';
    const isOwner = poll.createdBy.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Not authorized to delete this poll' });
    }

    await poll.deleteOne();
    res.json({ message: 'Poll deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting poll' });
  }
});

module.exports = router;
