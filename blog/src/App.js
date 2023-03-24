import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import Me from "./components/Me";
import Error from "./components/Error";

function App() {

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)

  useEffect(()=> {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[dispatch])
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Me/>}></Route>
          <Route path="*" element={<Error/>}></Route>
          {!isLoggedIn ? 
          <Route path="/auth" element={<Auth/>}/> :
          <>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/myBlogs" element={<UserBlogs/>}/>
          <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
          <Route path="/blogs/add" element={<AddBlog/>}/></>}
        </Routes>
      </main>
    </React.Fragment>
    
  );
}

export default App;
