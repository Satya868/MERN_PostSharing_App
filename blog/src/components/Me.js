import React from "react";
import "./Me.css";

const Me = () => {
  return (
    <>
      <div className="oops">
        <div className="Me1">
          <div className="Me-main">
            <h2>WELCOME TO THIS BLOG WEBSITE</h2>
            <div className="me">
              This website has been developed by
              <a href="https://www.linkedin.com/in/satya-prakash-755145223" target="_blank">
                {" "}
                SATYA PRAKASH
              </a>
            </div>
            {/*<div className="img1">
            <img src={} alt="Satya Prakash"/>
          </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Me;
{/*
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const labelStyles= {mb:1 ,fontSize:'23px',fontWeight:'bold', mt:1}

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setinputs] = useState({
    title:"", description:"", image:"",
  })

  const handleChange = (e) => {
    setinputs((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/api/blog/add" ,{
      title: inputs.title,
      description: inputs.description,
      image : inputs.image,
      user: localStorage.getItem("userId")
    }).catch(err => console.log(err))
    const data = await  res.data
    return data;
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
  }

  return (
    <div style={{alignContent:"center"}}>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="greenyellow" borderRadius={9} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display='flex' flexDirection={'column'} width={'70%'} >
          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h4' >Post your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField margin="normal" variant="outlined" name="title" value={inputs.title} onChange={handleChange}/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField margin="normal" variant="outlined" name="description" value={inputs.description} onChange={handleChange}/>
          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField margin="normal" variant="outlined" name="image" value={inputs.image} onChange={handleChange}/>
          <Button sx={{mt:2, borderRadius:4,}} variant='contained' color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;

*/}

{/*
export const addBlog = async(req,res, next)=>{
        const {title, description, image, user} = req.body;

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
            image,
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
}*/}