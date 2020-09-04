// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');
const User = require('../models/users.js');

// Routes

// All Users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

// Logged In User
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// User profile, with all posts
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const allPostsByOneUser = await Post.find({ user: user });
    console.log(allPostsByOneUser);
    res.status(200).json({ user, allPostsByOneUser });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Register User
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Export
module.exports = router;
