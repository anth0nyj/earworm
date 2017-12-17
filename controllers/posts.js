// Dependencies
const express     = require('express');
const router      = express.Router();

// Models
const Post        = require('../models/posts.js');
const Comment     = require('../models/comments.js');
const User        = require('../models/users.js');

// Routes

// Index Route for all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status( 200 ).json( allPosts );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Show route for one post
router.get('/:id', async (req, res) => {
  try {
    const onePost = await Post.findById(req.params.id);
    console.log( onePost );
    res.status( 200 ).json( onePost );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Show route for all posts by single user ==> to add later

// Create Route for one post
// Need to add authentication permissions later
router.post('/', async (req, res) => {
  try {
    console.log("Router.post try triggered");
    console.log("req.body: ", req.body);
    req.body.tag = req.body.tag.split(', ');
    console.log("Tag split from router.post");
    const user = await User.findById(req.body.user);
    console.log("User:", user);
    const newPost = await Post.create(req.body);
    console.log("newPost: ", newPost);
    res.status(200).json({newPost, user});
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Update route for posts
router.put( '/:id', async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate( req.params.id, req.body );
    console.log(updatePost);
    res.status( 200 ).json( updatePost );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Delete route for one post
// Need to add authentication permissions later
router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndRemove(req.params.id);
    res.status( 200 ).json( deletePost );
  } catch (err) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});


module.exports    = router;
