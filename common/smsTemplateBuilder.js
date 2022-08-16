const smsAction = require('../enums/smsAction.enum')

module.exports= {
    [smsAction.WELCOME]: (name)=>{
    return `Hi ${name}, welcome on our platform`
  }
}
