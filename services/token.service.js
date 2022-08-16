const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../configs/configs");
const {ACCESS, REFRESH} = require("../enums/tokenType.enum");
const CError = require('../errors/CustomError');

function generateAuthTokens(payload = {}) {
  const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  return {
    access_token,
    refresh_token
  }
}

function checkToken(token = '', tokenType = ACCESS) {
  try {
    let secret;
    if(tokenType === ACCESS) secret = ACCESS_TOKEN_SECRET
    if(tokenType === REFRESH) secret = REFRESH_TOKEN_SECRET

    return jwt.verify(token, secret);
  } catch (e) {
    throw new CError(`Token not valid`, 401);
  }
}

module.exports = {
  checkToken,
  generateAuthTokens
}
