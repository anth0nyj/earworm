// Dependencies
const express     = require('express');
const router      = express.Router();

// Models
const Post        = require('../models/posts.js');
const Comment     = require('../models/comments.js');
const User        = require('../models/users.js');

// Routes
// Index (for JSON and testing purposes)
router.get('/', async ( req, res ) => {
  try {
    const allComments = await Comment.find().populate('post').populate('user');
    res.status( 200 ).json( allComments);
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Create comment
router.post('/', async (req, res) => {
  try {
    const createdComment = await Comment.create( req.body );
    // need to figure out how/if to attach userAuthor here
    res.status( 200 ).json( createdComment );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Show one comment
router.get('/:id', async( req, res ) => {
  try {
    const oneComment = await Comment.findById( req.params.id ).populate('post').populate('user');
    console.log( 'The comment is: ', oneComment );
    res.status( 200 ).json( oneComment );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Update Comment
router.put('/:id', async ( req, res ) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate( req.params.id, req.body );
    console.log( updateComment );
    res.status( 200 ).json({ updateComment });
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});

// Delete route (one comment)
router.delete('/:id', async ( req, res ) => {
  try {
    const deleteComment = await Comment.findByIdAndRemove( req.params.id );
    res.status( 200 ).json( deleteComment );
  } catch ( err ) {
    console.log( err );
    res.status( 400 ).json({ err: err.message });
  }
});




module.exports    = router;
