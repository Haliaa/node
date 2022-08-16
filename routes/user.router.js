const userRouter = require("express").Router()

// const {isIdValid} = require('../middlewares/common.middleware')
const userController = require('../controllers/user.controller')
const commonMiddleware = require('../middlewares/common.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const fileMiddleware = require('../middlewares/file.middleware')
const userValidator = require("../validators/user.validator");
const queryValidator = require("../validators/query.validaor");

userRouter.get('/',
    // userMiddleware.isUserQueryValid,
    commonMiddleware.isDateValid(queryValidator.findAll, 'query'),
    userController.getUsers)

userRouter.post('/',
    // userMiddleware.isUserValidForPost,
    commonMiddleware.isDateValid(userValidator.newUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUnique,
    userController.postUser)

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUser)

userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUser)

userRouter.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    fileMiddleware.checkUserAvatar,
    // userMiddleware.isUserValidForUpdate,
    commonMiddleware.isDateValid(userValidator.updateUserValidator),
    userMiddleware.isUserPresent,
    userController.updateUser)

module.exports = userRouter;
