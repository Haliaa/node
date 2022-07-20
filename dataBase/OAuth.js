const {Schema ,model} = require("mongoose");

const OAuthSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true //поле обов'язкове для заповнення
    },

    access_token:{
        type:String,
        required:true //поле обов'язкове для заповнення
    },

    refresh_token:{
        type:String,
        required:true //поле обов'язкове для заповнення
    },
}, {timestamps:true})

module.exports = model('oauth', OAuthSchema)
