import mongoose from "mongoose";

// Mongoose schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: "student",
    enum: ['teacher', 'admin', 'student']
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;