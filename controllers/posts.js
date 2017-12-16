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

// Show route for all posts by single user ==> to add later

// Create Route for one post
// Need to add authentication permissions later
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status( 200 ).json( newPost );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Update route for posts
// router.put( '/:id', async (req, res) => {
//   try {
//     const updatePost = await Post.findByIdAndUpdate( req.params.id, req.body );
//     console.log(updatePost);
//     res.status( 200 ).json( updatePost );
//   } catch ( err ) {
//     console.log( err );
//     res.status( 400 ).json({ err: err.message });
//   }
// });

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
