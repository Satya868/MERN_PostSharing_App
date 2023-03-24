import React, { useState } from 'react'
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [value, setvalue] = useState()
  return (<>
    <AppBar position="sticky" sx={{ background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(233,201,10,1) 0%, rgba(84,6,26,1) 28%, rgba(81,69,175,1) 64%, rgba(0,255,226,1) 100%)'}}>
        <Toolbar>
            <Typography variant="h4">
                Share your Story
            </Typography>
           {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight="auto">
                <Tabs textColor="inherit" value={value} onChange={(e, val)=>setvalue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>

                </Tabs>
            </Box> }
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <>
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 9}} color="warning">Log In</Button>
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 9}} color="warning">Sign Up</Button>
                </>}
                {isLoggedIn &&
                <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 9}} color="warning" onClick={()=>dispatch(authActions.logout())}>Log Out</Button>
                }
            </Box>
        </Toolbar>        
    </AppBar>
    </>
  )
}

export default Header
