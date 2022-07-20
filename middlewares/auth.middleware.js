const { checkAccessToken } = require("../services/token.service");
const OAuth = require("../dataBase/OAuth");
const CError = require('../errors/CustomError');
const {findUser} = require('../services/user.service');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        return next(new CError('No token', 401));
      }

      checkAccessToken(access_token);

      const tokenInfo = await OAuth.findOne({ access_token }).populate('userId');

      if (!tokenInfo) {
        return next(new CError('Token not valid', 401));
      }

      req.user = tokenInfo.userId;
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
  }
}
