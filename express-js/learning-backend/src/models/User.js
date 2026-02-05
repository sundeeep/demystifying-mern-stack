import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  password: {
    type: String,
    required: true
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
  refreshToken: {
    type: String,
    default: null
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

userSchema.pre("save", async function(){
  if(!this.isModified("password")){
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function(candidatePassword){
  return bcrypt.compare(this.password, candidatePassword)
}

userSchema.methods.toJSON = function(){
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  console.log("toJSON() method!")
  return user
}

const User = mongoose.model('User', userSchema);

export default User;