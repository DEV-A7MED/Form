import userModel from "../../../DB/models/UserModel.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../../Utils/tokenMethods.js";


/**--------------------------------
    * @desc Sign up User
    * @route    /api/auth/signUp
    * @method   POST
    * @access   Public
-----------------------------------*/
const signUp=async(req,res,nxt)=>{
    // destruct data
    const {first_name,last_name,email,password,age}=req.body
    // check exist user
    const existUser=await userModel.findOne({email});
    if(existUser) return nxt(new Error("email already exist",{cause:409}));
    // password hashing
    const hashedPassword=bcrypt.hashSync(password,+process.env.SALT_ROUND)
    if(!hashedPassword)return nxt(new Error("fail to hash password",{cause:400}));
    // create user
    const newUser=new userModel({
        first_name,last_name,email,age,password:hashedPassword
    })
    const user =await newUser.save();
    // User Response
    user?res.status(201).json({message:"success"}): nxt (new Error("fail to added user"),{cause:403});

}

/**--------------------------------
    * @desc LogIn User
    * @route    /api/auth/logIn
    * @method   POST
    * @access   Public
-----------------------------------*/
const logIn=async(req,res,nxt)=>{
    // destruct data froom body
    const {email,password}=req.body
    // check user exist
    const existUser=await userModel.findOne({email});
    if(!existUser) return nxt(new Error("in-valid email or password",{cause:409}));

    // check correct password
    const matchedPassword=bcrypt.compareSync(password,existUser.password)
    if(!matchedPassword) return nxt(new Error("in-valid email or password",{cause:409}));

    // generate token
    const token =generateToken({
        payload:{
            _id:existUser._id,
            first_name:existUser.first_name,
            last_name:existUser.last_name ,
            email:existUser.email,              
            age:existUser.age

        }
    })
    // User Response
    return res.status(200).json({
        message:"success",
        token,
    })

}

export{
    signUp,
    logIn,
}