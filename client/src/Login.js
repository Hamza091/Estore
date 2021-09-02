import axios from 'axios'
import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,useHistory} from "react-router-dom"
import "./User_css/register.css"
import {useSelector,useDispatch} from "react-redux"
import {UpdateLogin} from './Redux/UpdateLogin'
import {clearUserData} from './Redux/Actions/ClearUserData'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        "Estore"
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// import {useSelector} from "react-redux"

export default function Login() {
    
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")
  const classes = useStyles();
  const userData=useSelector(state=>state.UserReducer)
  const Amount = useSelector(state=>state.UserBillReducer.Amount)
  const Product = useSelector(state=>state.UserBillReducer.Product)
  const dispatch = useDispatch()
  const history = useHistory()
  const checkSubmit = (credentials)=>
  {
    dispatch(UpdateLogin(credentials))
    history.push("/")
  }

  function updateEmail (e)
  {
      setEmail(e.target.value)
     
  }
  function updatePassword (e)
  {
      setPassword(e.target.value)
     
  }

    async function handleSubmit(e)
    {
        e.preventDefault()
        const login = {email , password}
        console.log(login)
        
      
        try
        {
            const res = await axios.post("/api/login",login)
            console.log(res.data)
            const uniqueId = res.data.uniqueId
            const name = res.data.name
            const admin = res.data.admin
            if(res.data.success)
            {
              const credentials = {id:res.data.uniqueId,success:true,admin:res.data.admin}
              if(admin)
              {
                  if(userData.length!=0)
                  {
                    dispatch(clearUserData())
                  }
                  dispatch(UpdateLogin(credentials))
                  history.push("/admin")
              }
              else
              {
                if(userData.length===0)
                {
                   checkSubmit(credentials)
                } 
                else{       
                try{
                const res = await axios(
                  {
                      method:"post",
                      url:"/api/postproduct",
                      data:{userProducts:userData,totalAmount:parseInt((Amount+(Product*10.30)).toFixed(2)),noOfProducts:Product,userName:name,userId:uniqueId}
                  }
                )
                console.log(res.data.success)
                if(res.data.success)
                {
                  dispatch(clearUserData())
                  alert("your order has been placed...")
                  history.push("/")
                }
              
              }
                catch(err)
                {
                    console.log(err)
                }
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
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={updateEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={updatePassword}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
              <Link to="/register" className="register">Don't have an account? Sign Up</Link>
              
              </div>
  );
}
