const {checkToken} = require("../services/token.service");
const OAuth = require("../dataBase/OAuth");
const CError = require('../errors/CustomError');
const {findUser} = require('../services/user.service');
const authValidator = require("../validators/auth.validator");
const {REFRESH} = require("../enums/tokenType.enum");
const {AUTHORIZATION} = require("../constants/constant");

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        return next(new CError('No token', 401));
      }

      checkToken(access_token);

      const tokenInfo = await OAuth.findOne({ access_token }).populate('userId');

      if (!tokenInfo) {
        return next(new CError('Token not valid', 401));
      }

      req.access_token = tokenInfo.access_token;
      req.user = tokenInfo.userId;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);

      if (!refresh_token) {
        return next(new CError('No token', 401));
      }

      checkToken(refresh_token, REFRESH);

      const tokenInfo = await OAuth.findOne({refresh_token})

      if (!tokenInfo) {
        return next(new CError('Token not valid', 401));
      }

      req.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserPresentForAuth: async (req, res, next) => {
    try {
      const {email} = req.body;

      const user = await findUser({ email });

      if (!user) {
        return next(new CError('Wrong email or password'));
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  isLoginBodyValid: async (req, res, next) => {
    try {
      const {error, value} = await authValidator.login.validate(req.body)

      if (error) {
        return next(new CError('Wrong email or password'));
      }

      req.user = value;
      next();
    } catch (e) {
      next(e);
    }
  },

  isEmailValid: async (req, res, next) => {
    try {
      const {error, value} = await authValidator.forgotPassword.validate(req.body)

      if (error) {
        return next(new CError('Wrong email'));
      }

      req.user = value;
      next();
    } catch (e) {
      next(e);
    }
  },

    isUserPresentByEmail: async (req, res, next) => {
    try {
      const {email} = req.body;

      const user = await findUser({ email });

      if (!user) {
        return next(new CError('Wrong email'));
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}
