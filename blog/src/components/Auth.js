import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setinputs] = useState({
    name:"", password:"", email:""
  })

  const handleChange = (e) => {
    setinputs((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const sendRequest = async (type="login")=>{
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    }).catch(err=> console.log(err))

    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    if(signUp){
      sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login())).then(()=> navigate('/blogs')).then(data =>console.log(data))
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login())).then(()=> navigate('/blogs')).then(data =>console.log(data))
    }
  }
  const [signUp, setsignUp] =useState(false)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow="10px 10px 20px #ccc" padding={3} margin='auto' marginTop={5}  borderRadius={5}>
          <Typography variant="h4">{signUp ? "Sign Up" : "Log In"}</Typography>
          {signUp &&
          <TextField margin="normal" placeholder="Name" name="name" value={inputs.name} onChange={handleChange}/>
          }
          <TextField margin="normal" type={'email'} placeholder="Email" name="email" value={inputs.email} onChange={handleChange}/>
          <TextField margin="normal" type={'password'} placeholder="Passsword" name="password"  value={inputs.password} onChange={handleChange}/>
          <Button sx={{borderRadius:3, marginTop: 3}} variant='contained' color='warning' type='submit'>Submit</Button>
          <Button variant="outlined" sx={{borderRadius:3}} onClick={()=>setsignUp(!signUp)} color="warning">{signUp ? "If Signed Up," : " "} {signUp ? "LogIn" : "SignUp"} </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
