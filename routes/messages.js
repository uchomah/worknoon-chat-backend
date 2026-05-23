const router = require('express').Router();

// Simple placeholder for messages
router.get('/conversations', (req, res) => {
  res.json([]);
});

router.post('/conversations', (req, res) => {
  res.json({ _id: 'temp123', participants: [] });
});

router.get('/conversations/:id/messages', (req, res) => {
  res.json([]);
});

router.post('/messages', (req, res) => {
  res.json({ _id: 'msg123', text: req.body.text });
});

module.exports = router;