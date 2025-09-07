

class AuthControllers{
    static register(req,res){
        const{fullName,email,password}=req.body
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(fullName.length<1 || fullName.length>50){
            return res.status(400).json({message:"Full name must be between 1 and 50 characters"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        
    }
    static async login(req,res){
        res.send("Login Route");
    }
}

export default AuthControllers;