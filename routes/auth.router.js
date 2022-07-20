const router = require("express").Router()
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')

router.post('/login',
    authMiddleware.isUserPresentForAuth,
    authController.login)

module.exports = router;
