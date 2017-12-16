const mongoose        = require('mongoose');

const commentSchema   = mongoose.Schema({
  content: { type: String, require: true },
  likes: { type: Number},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports        = mongoose.model('Comment', commentSchema);
