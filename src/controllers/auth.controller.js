const { toBoolean } = require('validator');
const { isNotEmpty, isString } = require('../utils/validate');
const { createUser, updatePassword, findOneByEmail } = require('../services/auth.service');
const {
  validateRegister,
  validateLogin,
  hashPassword,
  generateToken,
  verifyToken,
  sendEmailToResetPassword,
} = require('../utils/auth');

const authController = {
  // [POST] /api/auth/register
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      await validateRegister(username, email, password);

      const hashedPassword = await hashPassword(password);
      await createUser(username, email, hashedPassword);

      return res.status(201).json({ message: 'Register successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/auth/login
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await validateLogin(username, password);
      if (user) {
        const accessToken = generateToken({ id: user._id }, process.env.JWT_ACCESS_KEY, '1m');

        // store token and userId in cookies
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: toBoolean(process.env.COOKIES_SECURE),
          sameSite: process.env.COOKIES_SAME_SITE,
          maxAge: 60 * 1000, // 1 day
        });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others });
      }
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/auth/logout
  logout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: toBoolean(process.env.COOKIES_SECURE),
        sameSite: process.env.COOKIES_SAME_SITE,
      });

      return res.status(200).json({ message: 'Log out successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/auth/forgot-password
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      isNotEmpty(email, 'Email');
      isString(email, 'Email');

      const user = await findOneByEmail(email);

      const resetToken = generateToken({ id: user._id }, process.env.JWT_RESET_KEY, '15m');
      const info = await sendEmailToResetPassword(email, resetToken);

      return res.status(200).json(info);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/auth/reset-password
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;
      const { newPassword } = req.body;

      isNotEmpty(token, 'Token');
      isString(token, 'Token');

      isNotEmpty(newPassword, 'New Password');
      isString(newPassword, 'New Password');

      const user = verifyToken(token, process.env.JWT_RESET_KEY);
      await updatePassword(user.id, newPassword);

      return res.status(200).json({ message: 'Reset password successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/auth/me
  me: async (req, res, next) => {
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        return res.status(401).json({ isAuthenticated: false, message: 'No token provided' });
      }

      return res.status(200).json({ isAuthenticated: true, message: 'Token OK' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
