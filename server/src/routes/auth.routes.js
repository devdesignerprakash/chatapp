import express from 'express';
import AuthControllers from '../controllers/auth.controller.js';

const authRoutes= express.Router();

authRoutes.post('/login',AuthControllers.login);
authRoutes.post('/signup',AuthControllers.register)
authRoutes.post('/logout',AuthControllers.logout);



export default authRoutes;