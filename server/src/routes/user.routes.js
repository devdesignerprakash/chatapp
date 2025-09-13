import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import UserControllers from '../controllers/user.controller.js';

const userRouter= express.Router();

userRouter.use(verifyToken); // Apply verifyToken middleware to all routes in this router

userRouter.get('/getRecommendedUsers',UserControllers.getRecommendedUsers)
userRouter.get('getMyFriends',UserControllers.getMyFriends)
userRouter.post('friend-request/:id',UserControllers.sendFriendRequest)




export default userRouter;``