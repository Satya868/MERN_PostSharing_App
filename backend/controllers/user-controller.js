import User from "../model/User";
import bcrypt from 'bcryptjs'

// i haven't used any jwt token instead stored user id directly in local storage

export const getAllUser = async(req,res, next)=>{
    let users;
    try {
        users= await User.find();
    } catch (error) {
        console.log(error)
    }
    if (!users){
        return res.status(404).json({message:"No Users Found"})
    }
    return res.status(200).json({users})
} 
export const signup = async(req,res, next)=>{
    const {name, email, password} = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message: "User already exist! LogIn Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name, 
        email,
        password: hashedPassword,
        blogs:[]
    })

    
    try {
       await user.save();
    } catch (error) {
       return console.log(error)
    }
    return res.status(201).json({user})
}
export const login= async(req,res, next) =>{
    const {email, password}= req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message: "Couldn't find the user"})
    }

    const isPasswordcorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordcorrect){
        return res.status(400).json({ message: "invalid Credentials"})
    }
    return res.status(200).json({message:"LogIn successful", user: existingUser})

}