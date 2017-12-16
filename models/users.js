// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  // Password minlength set to 1 for testing purposes. Increase to 6(?) when deploying.
  password: {type: String, minlength: 1, required: true}
});

// Model Document Middleware
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = hashedPassword;
  }
  next();
});

//  Custom Instance Method
userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
