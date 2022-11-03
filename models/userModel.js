const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  id: ObjectId,
  created_at: Date,
  firstname: { type: String,  },
  lastname: { type: String, },
  email: { type: String, unique: true},
  password: { type: String, required: true },
  username: {type: String, required: true, unique: true}
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
UserModel.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(user.password, 10);

      this.password = hash;
      next();
  }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserModel.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return true;
}

const User = mongoose.model('Users', UserModel);

module.exports = User;
