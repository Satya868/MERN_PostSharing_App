import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const Blog = ({
  title,
  description,
  imageURL,
  userName,
  isUser,
  id,
  tarikh,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const serverPublic = "http://localhost:5000/images/";
  // serverPublic can also be called as 
  const imagePath = imageURL.replace(/^.*[\\\/]/, '')
  const imageUrl = `${serverPublic}/${imagePath}`
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  const bancho = userName.slice(0, 1).charAt(0).toUpperCase();

  return (
    <div>
      <Card
        sx={{
          maxWidth: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {bancho}
            </Avatar>
          }
          title={title}
          subheader={tarikh}
        />
        <CardMedia
          component="img"
          height="194"
       // {/*image={`${process.env.REACT_APP_PUBLIC_FOLDER}/${imageURL}`} */}
          image= {`http://localhost:5000/images/${imagePath}`}
          alt="Pics..."
        />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>
            {":"}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
