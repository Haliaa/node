const userRouter = require("express").Router()

const userController = require("../controllers/user.controller");
const userMiddlewares = require("../middlewares/user.middleware");

userRouter.get('/', userController.getUsers)
userRouter.post('/', userMiddlewares.isNewUserValid, userMiddlewares.isEmailRegistered, userController.postUser)
userRouter.get('/:userId', userController.getUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)

module.exports = userRouter;
