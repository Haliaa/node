const userRouter = require("express").Router()

// const {isIdValid} = require('../middlewares/common.middleware')
const userController = require('../controllers/user.controller')
const commonMiddleware = require('../middlewares/common.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const fileMiddleware = require('../middlewares/file.middleware')

userRouter.get('/',
    userMiddleware.isUserQueryValid,
    userController.getUsers)

userRouter.post('/',
    userMiddleware.isUserValidForPost,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUnique,
    userController.postUsers)

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
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUser)

module.exports = userRouter;
