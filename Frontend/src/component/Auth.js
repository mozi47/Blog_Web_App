import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Icon from './icon';
import useStyles from './Astyle';
import Input from './Input';
import {signin,signup} from "../actions/AuthAction"

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
  const classes = useStyles();
  const [isSignup,setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState(initialState)

  const handleShowPassword=()=>{
      setShowPassword((prevshowpassword)=>!prevshowpassword)
  }

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(isSignup){
      dispatch(signup(formData,history))
    }else{
      dispatch(signin(formData,history))
    }
  }

  const switchMode = ()=>{
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const googleSuccess = async (res)=>{
    try{
      const {data} = await axios.get("/api/user/google")
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Button className={classes.googleButton} color="primary" fullWidth onClick={googleSuccess} startIcon={<Icon />} variant="contained">
          Google Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;