import UserMoodel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------------get all users------------------------------------------

export const getAllUser = async (req, res)=>{
    try {
        
        let users = await UserMoodel.find();
       

        users =users.map((user)=>{
            const {password, ...otherDetails} = user._doc
           
            return otherDetails

        })
      
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);
    }
}

// -----------------------get users------------------------------------------------------------

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserMoodel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;
           

            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("no such user exist");
        }

    } catch (error) {
        res.status(500).json(error);
    }
};


// -------------------update user------------------------------------------------

export const updateUser = async(req,res)=>{

    const id = req.params.id;
    const {_id , currentUserAdminStatus , password}=req.body;

    if(id===_id){

        try {

            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(password,salt);

            }
            const user = await UserMoodel.findByIdAndUpdate(id,req.body,{new:true});

            const token =jwt.sign(
                {username : user.username , id:user._id},
                process.env.JWT_KEY,
                {expiresIn :"1h"}
            )
            res.status(200).json({user,token});
            
        } catch (error) {
            res.status(500).json(error);
        }

    }
    else{
        res.status(403).json("Access Denied! You can only update own profile");
    }

};


// ---------------------delete user---------------------------------------

export const deleteUser = async(req,res)=>{
    const id = req.params.id;

    const{currentUserId,currentUserAdminStatus}=req.body;

    if(id===currentUserId || currentUserAdminStatus){
        
        try {
            await UserMoodel.findByIdAndDelete(id);
            res.status(200).json("user deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Access Denied! You can only delete own profile");
    }
};


// ----------------------Follow a User---------------------------------------------


export const followUser = async(req,res)=>{

    const id = req.params.id;
    const {_id} = req.body;

    if(_id ===id){
        res.status(403).json("action forbidden")
    } 

    else{
        try { 
            const followUser = await UserMoodel.findById(id);
            const followingUser = await UserMoodel.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push:{followers:_id}});
                await followingUser.updateOne({$push:{following:id}});
                res.status(200).json("User Followed");
            }
            else{
                res.status(403).json("User already follow by you");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


// -----------------UnFollow a User---------------------------------------------------------------------

export const unFollowUser = async(req,res)=>{

    const id = req.params.id;
    const {_id} = req.body;

    if(_id ===id){
        res.status(403).json("action forbidden")
    }

    else{
        try { 
            const followUser = await UserMoodel.findById(id);
            const followingUser = await UserMoodel.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull:{followers:_id}});
                await followingUser.updateOne({$pull:{following:id}});
                res.status(200).json("User UnFollowed");
            }
            else{
                res.status(403).json("User not follow by you");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
};