const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const roles = ['user', 'admin'];
const ItemStack = require('./model-item-stack');
const uniqueValidator = require('mongoose-unique-validator');


const User = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  games : {
    type : [mongoose.Schema.ObjectId],
    ref : 'Game',
  },
  items : {
    type : [ItemStack]
  }


}, {
  timestamps: true
})

User.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  const rounds = 9;

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash;
    next()
  }).catch(next)
});

User.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', ];

    if (full) {
      fields = [...fields, 'role', 'email', 'items', 'games',]
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

User.statics = {
  roles
}

const model = mongoose.model('User', User)

User.plugin(uniqueValidator, { message: 'Email adress is already taken by another user!' });

module.exports = {model, userSchema: User}
