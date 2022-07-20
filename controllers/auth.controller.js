const {comparePassword} = require('../services/password.service');
const {generateAuthTokens} = require('../services/token.service');
const OAuth = require('../dataBase/OAuth');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await comparePassword(hashPassword, password);

      const tokens = generateAuthTokens();

      await OAuth.create({
        userId: _id,
        ...tokens
      })

      res.json({
        user: req.user,
        ...tokens
      });
    } catch (e) {
      next(e)
    }
  }
};
