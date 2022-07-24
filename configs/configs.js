module.exports = {
  PORT: process.env.PORT || 5555,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'tozhesecret',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'galasevcik@gmail.com',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
};
