const express = require('express');
const { registerController, verifyController, refreshAccessToken, loginController, logOutController, logOutAllController } = require('../controller/auth');
const { authMiddleware } = require('../middlewares/auth.middleware');
const authRouter  = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/verify",verifyController);
authRouter.post("/login",loginController);
authRouter.get("/refresh/token",refreshAccessToken);
authRouter.get("/log/out",logOutController);

authRouter.get("/log/out/all",logOutAllController);

module.exports = authRouter;