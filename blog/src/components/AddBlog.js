import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const labelStyles = { mb: 1, fontSize: '23px', fontWeight: 'bold', mt: 1 };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const sendRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", inputs.image);
      formData.append("user", localStorage.getItem("userId"));

      const res = await axios.post("http://localhost:5000/api/blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };

  return (
    <div style={{ alignContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="greenyellow"
          borderRadius={9}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="70%"
        >
          <Typography fontWeight="bold" padding={3} color="grey" variant="h4">
            Post your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField margin="normal" variant="outlined" name="title" value={inputs.title} onChange={handleChange} />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField margin="normal" variant="outlined" name="description" value={inputs.description} onChange={handleChange} />
          <InputLabel sx={labelStyles}>Image</InputLabel>
          <input type="file" onChange={handleImageChange} />
          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
