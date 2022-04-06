import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      index: true,
    },
    password: {
      type: String,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    secretOtp: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    type: {
      type: String,
      enum: ['tutor', 'student'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.secretOtp;
  delete userObject.googleId;
  delete userObject.facebookId;
  return userObject;
};

userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      data: {
        id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

userSchema.statics.generateToken = function (user) {
  const accessToken = jwt.sign(
    {
      data: {
        _id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    {
      data: {
        _id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  return { accessToken, refreshToken };
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
