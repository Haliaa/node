//https://crontab.guru/#00_9_1-15_*_3
//планування часу (не відштовхуючись від запуску проекту як в setInterval)
//встановлення певної дії на заплановане число

const cron = require('node-cron');

const deleteOldOauthTokens = require('./remove-old-oauth-tokens.cron')

module.exports = ()=> {
    // cron.schedule('*/10 * * * * *', deleteOldOauthTokens)
    cron.schedule('0 0 1 * *', deleteOldOauthTokens)
}
