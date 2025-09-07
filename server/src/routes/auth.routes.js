import express from 'express';
import AuthControllers from '../controllers/auth.controller.js';

const authRoutes= express.Router();

authRoutes.post('/login',AuthControllers.login);
authRoutes.post('/register',AuthControllers.register)


export default authRoutes;