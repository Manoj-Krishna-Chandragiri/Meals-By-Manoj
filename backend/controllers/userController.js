import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


//login user
const loginUser = async (req,res) => {
       const {email,password} = req.body;
       try{
          const user = await userModel.findOne({email});
          if(!user){
            return res.json({success:false,message:"user doesn't exists"})
          }
          const isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
          }
          const token = createToken(user._id);
          res.json({success:true,token});
       }catch(error){
          console.log(error);
          res.json({success:false,message:"Error"})
          
       }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

 //register user
 const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        //checking If user is exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please,Enter a valid email"});
        }
        if(password.length<8){
             return res.json({success:false,message:"Password must contain 8 letters"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
 }

 // Add a new function to list all users
const listUsers = async (req, res) => {
  try {
    // Get all users but exclude sensitive info like passwords
    const users = await userModel.find({}, { password: 0 });
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching users" });
  }
};

// Don't forget to export the new function
export { registerUser, loginUser, listUsers };
