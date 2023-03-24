import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async(req,res, next)=>{
    let blogs;
    try {
        blogs = await Blog.find().populate('user')
    } catch (error) {
        console.log(error)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async(req,res, next)=>{
        const {title, description, user} = req.body;

        let existingUser;
        try {
            existingUser = await User.findById(user)
        } catch (error) {
            return console.log(error)
        }
        if(!existingUser){
            return res.status(400).json({message: "Unable to find User by this id"})
        }
        const blog= new Blog({
            title,
            description, 
            // here the path of file in stored in mongo so we must remove the unwanted path and use the hardcoded backend site to render image in frontend....
            // one more thing (req.file) is considered unsafe because because meta data is also in file format along with MIMIE data( some f*king name)        
            image: req.file.path, // aha pe image ka alag se lena pada pahle lena unsafe tha, web security..gootcha
            user,
        })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
    return res.status(200).json({blog})
}

export const updateBlog = async(req,res, next)=>{
    const {title, description} = req.body
    const blogId = req.params.id //here id is same as that of id written in blog routes like
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(500).json({message: "couldn't find"})
    }
    return res.status(200).json({blog})   
}

export const getById = async(req,res, next)=>{
    const id = req.params.id;
    let blog;
    try {
       blog = await Blog.findById(id) // ghere "id" is same as "id" which i have mentioned in routes of the blog 
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(404).json({message: "No blog found"})
    }
    return res.status(200).json({blog})
}
export const deleteBlog = async(req,res, next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog) 
        await blog.user.save()    
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(500).json({message: "Unable to delete"})
    }
    return res.status(200).json({message: "Successfully deleted"})

}

export const getUserId = async(req,res, next)=>{
    const userId= req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
        
    } catch (error) {
        return console.log(error)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No BLog found"})
    }
    return res.status(200).json({ user: userBlogs})
}
