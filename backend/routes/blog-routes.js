import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, getUserId, updateBlog } from "../controllers/blog-controller";
import multer from 'multer'
const blogRouter = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  //other way of file name Date().now+"_"+...
    },
  });
const upload = multer({ storage: storage });

blogRouter.get('/', getAllBlogs)
blogRouter.post('/add', upload.single('image'), addBlog) // 'image' as per reference of model
blogRouter.put('/update/:id',updateBlog)
blogRouter.get("/:id", getById)
blogRouter.delete("/:id", deleteBlog)
blogRouter.get('/user/:id',getUserId)

export default blogRouter