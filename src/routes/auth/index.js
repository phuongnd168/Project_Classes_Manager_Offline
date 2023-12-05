var express = require("express");
const authController = require("../../http/controllers/auth/auth.controller");
var router = express.Router();
const passport = require("passport");
const roleMiddleware = require("../../http/middlewares/role.middleware");
const authMiddleware = require("../../http/middlewares/auth.middleware");



router.get("/login", roleMiddleware, authController.login);
router.post('/login', roleMiddleware, passport.authenticate('local', {
    successFlash: true,
    successRedirect: "/role",
    failureRedirect: '/auth/login',
    failureFlash: true,
}));
router.get("/google/redirect", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successFlash: true,
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/role",
  }))

router.get('/github/redirect', passport.authenticate('github'))
router.get('/github/callback', passport.authenticate('github', {
  successFlash: true,
  failureRedirect: "/auth/login",
  failureFlash: true,
  successRedirect: "/role",

}))
router.get('/facebook/redirect', passport.authenticate('facebook'))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successFlash: true,
  failureRedirect: "/auth/login",
  failureFlash: true,
  successRedirect: "/role"
  
}))
router.get('/logout', authController.logout);
router.get('/cancel-connect', authController.cancelConnectSocial);
router.get('/forgot-password', authController.forgotPassword);
router.post('/forgot-password', authController.handleForgotPassword);
router.get('/verify/:token', authController.recoverPassword);
router.post('/verify/:token', authController.handleRecoverPassword);
router.get('/otp', authMiddleware, authController.otp);
router.post('/otp', authMiddleware, authController.handleOtp);
module.exports = router;
