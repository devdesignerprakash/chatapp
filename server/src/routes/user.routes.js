import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter= express.Router();

userRouter.use(verifyToken); // Apply verifyToken middleware to all routes in this router

userRouter.get('/getRecommendedUsers')




export default userRouter;