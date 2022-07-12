const userController = require("../controllers/user.controller");
const userRouter = require("express").Router

userRouter.get('/', userController.getUsers)
userRouter.post('/', userController.postUser)
userRouter.get('/:id', userController.getUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter;
