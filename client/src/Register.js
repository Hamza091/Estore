import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {UpdateLogin} from './Redux/UpdateLogin'
import {useHistory} from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory()
  const classes = useStyles();
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [address,setAddress]=useState("")
  const [number,setNumber]=useState("")
  const userDataInfo=useSelector(state=>state.UserReducer)
  const Amount = useSelector(state=>state.UserBillReducer.Amount)
  const Product = useSelector(state=>state.UserBillReducer.Product)
  function firstNameChange(e)
  {
      setFirstName(e.target.value)
  }
  function LastNameChange(e)
  {
      setLastName(e.target.value)
  }
  function emailChange(e)
  {
      setEmail(e.target.value)
  }
  function passwordChange(e)
  {
      setPassword(e.target.value)
  }
  function addressChange(e)
  {
      setAddress(e.target.value)
  }
  function numberChange(e)
  {
      setNumber(e.target.value)
  }
  const dispatch = useDispatch()
  async function handleSubmit(e)
  {
        e.preventDefault()
        const num =parseInt(number)
        const userData = {firstName,lastName,email,password,address,num}
        try{
        const res = await axios.post("/api/register",userData)
        console.log(res.data)
        const uniqueId = res.data.uniqueId
        const name = res.data.name
        if(res.data.success)
        {
          const credentials = {id:res.data.uniqueId,success:true}
          if(userDataInfo.length===0)
          {
            dispatch(UpdateLogin(credentials))
            history.push("/")
          }
          else{
          try{
            const res = await axios(
              {
                  method:"post",
                  //url:"http://localhost:8888/api/postproduct",
                  url:"/api/postproduct",
                  data:{userProducts:userDataInfo,totalAmount:parseInt((Amount+(Product*10.30)).toFixed(2)),noOfProducts:Product,userName:name,userId:uniqueId}
              }
            )
            console.log(res.data)
            }
            catch(err)
            {
                console.log(err)
            }
            dispatch(UpdateLogin(credentials))
          }
        }
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={firstNameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={LastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Home Address"
                name="address"
                autoComplete="home address"
                onChange={addressChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone number"
                onChange={numberChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}