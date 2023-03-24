import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const labelStyles= {mb:1 ,fontSize:'23px',fontWeight:'bold', mt:1}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog , setBlog] = useState()
  const id = useParams().id;
  console.log(id)

  const [inputs, setinputs] = useState({ })

  const handleChange = (e) => {
    setinputs((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const fetchDetails = async() =>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err) => console.log(err))
    const data =  await res.data
    return data
  }
  useEffect(()=>{
    fetchDetails().then(data =>{ setBlog(data.blog)
    setinputs({title: data.blog.title, description: data.blog.description})})
  },[id])

  const sendRequest = async()=>{
    const res= await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title : inputs.title,
      description: inputs.description,
    }).catch((err) => console.log(err))

    const data = await res.data
    return data
  }
  console.log(blog)

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs/"))
  }
  return (
   
    <div>
       {inputs &&
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="greenyellow" borderRadius={9} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display='flex' flexDirection={'column'} width={'70%'} >
          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h4' >Post your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField margin="normal" variant="outlined" name="title" value={inputs.title} onChange={handleChange}/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField margin="normal" variant="outlined" name="description" value={inputs.description} onChange={handleChange}/>
          <Button sx={{mt:2, borderRadius:4,}} variant='contained' color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    }
    </div>
  )
}

export default BlogDetail
