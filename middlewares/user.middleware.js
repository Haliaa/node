const CError = require('../error/CustomError') //CustomError

module.exports = {
    checkUserOnCreate: (req, res, next)=>{
        try {
            const {name='', age=0, email='', password=''} = req.body;

            if(!name || !password || !email){
                throw new CError('Some field is missed')
            }

            if(password.length <5){
                throw new CError('Password should include at least 5 symbols')
            }
            next()

        }catch (e) {
            res.status(400).json(e.message)
        }
    }
}
