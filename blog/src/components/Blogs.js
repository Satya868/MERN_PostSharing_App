import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs]= useState();

  const sendRequest = async ()=>{
    const res = await axios.get("http://localhost:5000/api/blog").catch(err => console.log(err))
    const data = await res.data;
    return data
  }
  useEffect(() => {
    sendRequest().then(data=>setBlogs(data.blogs))
  },[])
  console.log(blogs)

  const dinank = new Date();
  const tarikh = dinank.toDateString()
  return (
    <div className='blogs'>
      {blogs && blogs.map((blog, index) => (
        <Blog id={blog._id} title={blog.title} description={blog.description} imageURL={blog.image} userName={blog.user.name}
        isUser={localStorage.getItem('userId')=== blog.user._id} tarikh={tarikh}
        />
      ))}
    </div>
  )
}

export default Blogs
