const emailActions = require('../constants/emailActions.enum')

module.exports = {
    [emailActions.WELCOME]:{
        subject: 'Welcome onboard',
        template: 'welcome.pug'
        // <div style="color: #ffca24">Good morning, EVERYBODY!☀</div>
    },
    [emailActions.FORGOT_PASSWORD]:{
        subject: 'Ups, looks like you forgot password!',
        template: 'forgotPassword'
        // '<div style="color: #7c0000">UUUPPS!😛</div>'
    },
    [emailActions.USER_BANNED]:{
        subject: 'Account was blocked',
        template: 'account-blocked'
        // '<div style="color: #7c0000">UUUPPS!😛</div>'
    }
}
