module.exports = {
    PORT: process.env.PORT || 5555,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'sec',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'toz',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER:process.env.TWILIO_NUMBER,

};
