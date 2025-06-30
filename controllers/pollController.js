const Poll = require('../models/Poll');

exports.voteOnPoll = async (req, res) => {
  const pollId = req.params.id;
  const { option } = req.body;
  const userId = req.user._id;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    if (poll.voted.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    const selectedOption = poll.options.find(opt => opt.text === option);
    if (!selectedOption) {
      return res.status(400).json({ message: 'Invalid option selected' });
    }

    selectedOption.votes += 1;
    poll.voted.push(userId);

    await poll.save();

    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getPollResults = async (req, res) => {
  const pollId = req.params.id;
  const user = req.user;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    const isAdmin = user && user.role === 'admin';
    const pollEnded = poll.isEnded;

    if (!isAdmin && !pollEnded) {
      return res.status(403).json({ message: 'Results are not available yet' });
    }

    res.status(200).json({
      question: poll.question,
      results: poll.options.map(opt => ({
        text: opt.text,
        votes: opt.votes
      }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.endPoll = async (req, res) => {
  const pollId = req.params.id;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    poll.isEnded = true;
    await poll.save();

    res.status(200).json({ message: 'Poll has been ended' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
