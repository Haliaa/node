const userRouter = require("express").Router()

const authController = require("../controllers/auth.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {FORGOT_PASSWORD} = require("../constants/emailActions.enum");

userRouter.post('/login', userMiddleware.checkIsUserPresent ,authController.login)
userRouter.post('/password/forgot', userMiddleware.checkIsUserPresent ,authController.forgotPassword)
userRouter.post('/password/forgot/set', authMiddleware.checkActionToken(FORGOT_PASSWORD) ,authController.setForgotPassword)

module.exports = userRouter;
