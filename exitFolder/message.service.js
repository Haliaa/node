function sendSMS(phone, text) {
    console.log('Send sms in progress')
    console.log(phone, text)
}

module.exports = {
    sendSMS
}
module.exports.sendEmail = (email) => {
    console.log(email);
}
// module.exports = (email) => {
//     console.log(email);
// } //-без майбутнього бо якщо ще щось дописувати прийдеться,то треба буде перероблювати(кожгій ф-ї надавати назву)
