const mongoose     = require('mongoose');

const postSchema   = mongoose.Schema({
  artist: { type: String, require: true },
  songTitle: { type: String, require: true },
  url: { type: String, require: true },
  tag: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', postSchema);
