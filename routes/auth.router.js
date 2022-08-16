const router = require("express").Router()
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')

router.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login)

router.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken)

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout)

router.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices)

router.post('/forgotPassword',
    authMiddleware.isEmailValid,
    authMiddleware.isUserPresentByEmail,
    authController.forgotPassword
)

module.exports = router;
