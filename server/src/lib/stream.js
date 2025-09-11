import {StreamChat} from 'stream-chat';
import dotenv from 'dotenv';

dotenv.config();

const api_key=process.env.STREAM_API_KEY;
const api_secret=process.env.STREAM_API_SECRET;

if(!api_key || !api_secret){
    console.log('api key is missing')
}

const streamClient =StreamChat.getInstance(api_key,api_secret);

export const createStreamUser= async(userData)=>{ 
    try{
        await streamClient.upsertUser(userData)
        return userData;

    }catch(error){
        console.log("upserting user error",error);
    }
}