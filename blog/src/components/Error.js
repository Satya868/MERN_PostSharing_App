import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from "react-redux";


const Error = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
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
            
            <Link to={isLoggedIn ? "/myBlogs" : "/auth"}><p style={{display: "flex", flexDirection:"column", alignItems:"center" , color:"green", fontSize:"bolder", border: "1px solid", borderRadius:"50%" , borderColor:"radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(162,174,77,1) 32%, rgba(98,207,204,1) 43%, rgba(244,67,115,1) 52%, rgba(219,94,133,1) 59%, rgba(194,121,125,1) 66%, rgba(182,136,183,1) 82%, rgba(70,252,238,1) 100%)"}}><h2>MoVe oN</h2></p></Link>
          </div>
          {/*<div className="img1">
          <img src={} alt="Satya Prakash"/>
        </div>*/}
        </div>
      </div>
    </div>
  </>
  )
}

export default Error
