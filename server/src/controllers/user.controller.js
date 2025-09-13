import User from '../models/user.model.js';
import FriendRequest from '../models/friendRequest.model.js';

class UserControllers {
    static async getRecommendedUsers(req,res){
        try{
            const currentUserId= req.user.Id
            const currentUser= req.user
            const recommendedUser= await User.find({
                $and:[
               { _id:{$ne:currentUserId}},            //exclude current user
               {id:{$nin:currentUser.friends}},//exclude current user's friends
                {isonBoarded:true} //only include users who have completed onboarding
                ]
            })
            res.status(200).json(recommendedUser)

        }catch(error){
            console.log('get recommended users error',error)
            res.status(500).json({message:'Internal server error'})
        }
    }
    static async getMyFriends(req,res){
        try{
            const user= req.user
            const friends = await User.find({_id:{$in:user.friends}}).populate('friends','firstName lastName profilePic nativeLanguage learningLanguage')
            res.status(200).json(friends)

        }catch(error){
            console.log('get my friends error', error)
            res.status(500).json({message:'Internal server error'})
        }
    }
    static async sendFriendRequest(req,res){
        try{
            const senderId = req.user.id;
            const receiverId = req.params.id;
            if (senderId === receiverId) {
                return res.status(400).json({ message: 'You cannot send a friend request to yourself' });
            }
            const reciever= await User.findById(receiverId);
            if(!reciever){
                return res.status(404).json({message:'User not found'})
            }
            //
            if(reciever.friends.includes(senderId)){
                return res.status(400).json({message:'You are already friends'})
            }
            // Check if the friend request already exists
            const existingRequest = await FriendRequest.findOne({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            });

            if (existingRequest) {
                return res.status(400).json({ message: 'Friend request already sent' });
            }

            // Create a new friend request
            const newFriendRequest =  await FriendRequest.create({
                sender: senderId,
                receiver: receiverId
            });

            res.status(201).json({ message: 'Friend request sent successfully'});

        }catch(error){
            console.log('send friend request error', error)
            res.status(500).json({message:'Internal server error'})
        }
    }
    static async respondToFriendRequest(req,res){
        try{
            const requestId= req.params.id;
            const friendRequest= await FriendRequest.findById(requestId);
            if(!friendRequest){
                return res.status(404).json({message:'Friend request not found'})
            }
            

        }catch(error){
            console.log('respond to friend request error', error)
            res.status(500).json({message:'Internal server error'})
        }
    }
}


export default UserControllers;