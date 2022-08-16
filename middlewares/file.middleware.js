const CError = require('../errors/CustomError');
const {IMAGE_MAX_SIZE, IMAGE_MIMETYPE} = require("../constants/constant");

module.exports = {
  checkUserAvatar: async (req, res, next) => {
    try {

      // if(req.files && req.files.avatar){} //the same ↓
      if(!req.files?.avatar){
        return next();
      }

      const {mimetype, size} = req.files.avatar;

      if (size>IMAGE_MAX_SIZE) {
        return next(new CError('Max size 3MB'));
      }
      if (!IMAGE_MIMETYPE.includes(mimetype)) {
        return next(new CError('Wrong file type'));
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
