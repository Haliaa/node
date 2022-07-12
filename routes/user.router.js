const userRouter = require("express").Router()

const userController = require('../controllers/user.controller')

userRouter.get('/', userController.getUsers)
userRouter.post('/', userController.postUsers)
userRouter.get('/:userId', userController.getUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.put('/:userId', userController.updateUser)

module.exports = userRouter;
