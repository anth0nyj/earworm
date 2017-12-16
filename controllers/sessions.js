// Dependencies
const express = require('express');
const router = express.Router();

const User = require('../models/users.js');

// Routes

// Login Post Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (user.authenticate(req.body.password)) {
      req.session.user = user;
      res.status(200).json({user}); // Successful login
    } else {
      res.status(403).json({err: "Forbidden"}); // Wrong password
    }
  } catch (err) {
    res.status(400).json({err: err.message}) // Invalid username
  }
});

// Logout Delete Route
router.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({message: "Session destroyed"});
  });
});

// Export
module.exports = router;
