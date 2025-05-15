const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/user.model');
const { APIError } = require('../error');
const { isString } = require('./validate');

const validateRegister = async (username, email, password) => {
  // check empty
  if (!username || !email || !password) {
    throw new APIError('Please fill all the fields!', 400);
  }

  // check type
  isString(username, 'Username');
  isString(email, 'Email');
  isString(password, 'Password');

  // check email type
  if (!validator.isEmail(email)) {
    throw new APIError('Email is not valid!', 400);
  }

  // check password length
  if (password.length < 8) {
    throw new APIError('Password must have at least 8 characters', 400);
  }

  // check existing user
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (existingUser) {
    // check existing username
    if (username === existingUser.username) {
      throw new APIError('Username already exists!', 400);
    }

    // check existing email
    if (email === existingUser.email) {
      throw new APIError('Email already exists!', 400);
    }
  }
};

const validateLogin = async (username, password) => {
  // check user fill username or password
  if (!username || !password) {
    throw new APIError('Please fill all the fields!', 400);
  }

  // check type
  isString(username, 'Username');
  isString(password, 'Password');

  // find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new APIError('Invalid username!', 404);
  }

  // check password
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new APIError('Invalid password!', 401);
  }

  return user;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (payload, jwtKey, time) => {
  return jwt.sign(payload, jwtKey, { expiresIn: time });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtKey);
  } catch (err) {
    console.log(err);
  }
};

const sendEmailToResetPassword = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

  const info = await transporter.sendMail({
    from: `"FLASH VN" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset your FLASH account password',
    html: `<h3>Reset your FLASH account password</h3>
          <p>Click <a href="${resetLink}">here</a> to reset your password</p>
          <p>If not you, you can ignore this email!</p>`,
  });

  return info;
};

module.exports = {
  validateRegister,
  validateLogin,
  hashPassword,
  generateToken,
  verifyToken,
  sendEmailToResetPassword,
};
