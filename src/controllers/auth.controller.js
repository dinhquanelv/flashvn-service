const { toBoolean } = require('validator');
const {
  validateRegister,
  validateLogin,
  hashPassword,
  generateToken,
  verifyToken,
  sendEmailToResetPassword,
} = require('../utils/auth');
const { isNotEmpty } = require('../utils/validate');
const { saveUser, updatePassword, findOneByEmail } = require('../services/auth.service');

const authController = {
  // [POST] /api/v1/auth/register
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      await validateRegister(username, email, password);

      const hashedPassword = await hashPassword(password);
      await saveUser(username, email, hashedPassword);

      return res.status(201).json({ message: 'Register successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/auth/login
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await validateLogin(username, password);
      if (user) {
        const accessToken = generateToken({ id: user._id }, process.env.JWT_ACCESS_KEY, '1d');

        // store token and userId in cookies
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: toBoolean(process.env.COOKIES_SECURE),
          sameSite: process.env.COOKIES_SAME_SITE,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.cookie('userId', user._id, {
          httpOnly: true,
          secure: toBoolean(process.env.COOKIES_SECURE),
          sameSite: process.env.COOKIES_SAME_SITE,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others });
      }
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/auth/logout
  logout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: toBoolean(process.env.COOKIES_SECURE),
        sameSite: process.env.COOKIES_SAME_SITE,
      });
      res.clearCookie('userId', {
        httpOnly: true,
        secure: toBoolean(process.env.COOKIES_SECURE),
        sameSite: process.env.COOKIES_SAME_SITE,
      });

      return res.status(200).json({ message: 'Log out successfully!' });
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/auth/forgot-password
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await findOneByEmail(email);

      const resetToken = generateToken({ id: user._id }, process.env.JWT_RESET_KEY, '15m');
      const info = await sendEmailToResetPassword(email, resetToken);

      return res.status(200).json(info);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/auth/reset-password
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;
      const { newPassword } = req.body;

      isNotEmpty(token, 'Token');
      isNotEmpty(newPassword, 'New Password');

      const decode = verifyToken(token);
      await updatePassword(decode.payload.id, newPassword);

      return res.status(200).json({ message: 'Reset password successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
