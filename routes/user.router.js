const userRouter = require("express").Router()

const userController = require('../controllers/user.controller')
// const {isIdValid} = require('../middlewares/common.middleware')
const commonMiddleware = require('../middlewares/common.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

userRouter.get('/', userMiddleware.isUserQueryValid, userController.getUsers)
userRouter.post('/', userMiddleware.isUserValidForPost,userMiddleware.isUserUnique, userController.postUsers)

userRouter.get('/:id', commonMiddleware.isIdValid, userMiddleware.isUserPresent, userController.getUser)
userRouter.delete('/:id', commonMiddleware.isIdValid, authMiddleware.checkAccessToken , userMiddleware.isUserPresent, userController.deleteUser)
userRouter.put('/:id', commonMiddleware.isIdValid, userMiddleware.isUserValidForUpdate, userMiddleware.isUserPresent, userController.updateUser)

module.exports = userRouter;
