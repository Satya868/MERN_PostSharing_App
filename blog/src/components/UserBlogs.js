import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog'

const UserBlogs = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId")

  const sendRequest = async () =>{
    const res= await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=>console.log(err))
    const data = await res.data 
    return data
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  },[])

 // const imagePath = blog.image.path;
  // const filename = path.basename(imagePath);

  return (
    <div className='myblog'>
      {user && user.blogs && user.blogs.map((blog, index) => (
        <Blog isUser={true} key={index} id={blog._id} title={blog.title} description={blog.description}       
        imageURL={blog.image} userName={user.name}/>
      ))}
    </div>
  )
}

export default UserBlogs
