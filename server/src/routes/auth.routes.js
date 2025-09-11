import express from 'express';
import AuthControllers from '../controllers/auth.controller.js';
import {verifyToken} from '../middlewares/verifyToken.js';

const authRoutes= express.Router();

authRoutes.post('/login',AuthControllers.login);
authRoutes.post('/signup',AuthControllers.register)
authRoutes.post('/logout',AuthControllers.logout);
authRoutes.post('/onboard',verifyToken,AuthControllers.onBoard);



export default authRoutes;