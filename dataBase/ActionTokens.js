const {Schema ,model} = require("mongoose");

const emailActions = require('../constants/emailActions.enum')

const ActionTokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true //поле обов'язкове для заповнення
    },

    token:{
        type:String,
        required:true //поле обов'язкове для заповнення
    },

    actionType:{
        type:String,
        enum:Object.values(emailActions),
        required:true //поле обов'язкове для заповнення
    }
}, {timestamps:true})

module.exports = model('action_tokens', ActionTokenSchema)
