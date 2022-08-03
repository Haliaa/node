const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER} = require('../configs/configs');
const twilio = require('twilio');
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

module.exports = {
    sendSMS: async (phone, message) => {
        try {
            console.log(`SMS start sending | to: ${phone} | message:${message}`)
            const smsInfo = await client.messages.create({
                from: TWILIO_NUMBER,
                to: phone,
                body: message
            })
            console.log(`SMS response | status:${smsInfo.status} | sid:${smsInfo.sid}`)
        } catch (e) {
            console.error(`SMS error sending | to: ${phone} | error:${e}`)

        }

    }
}
