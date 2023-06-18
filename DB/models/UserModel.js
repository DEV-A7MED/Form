import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        first_name:{
            type:String,
            required: [true, 'userName is required'],
        },
        last_name:{
            type:String,
            required: [true, 'userName is required'],
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:8
        },
        age:Number
        
    },
    {
        timestamps:true,
        
    }
);
const userModel=mongoose.models.user||mongoose.model("user",userSchema)
export default userModel;