import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './User_css/nav.css'
import cartLogo from './cartLogo.png'
import {Link,useHistory} from 'react-router-dom';
import {UpdateLogin} from './Redux/UpdateLogin'
import {UserReducer} from './Redux/UserReducer'
import { clearUserData } from './Redux/Actions/ClearUserData';
import { UserBill } from './Redux/Actions/UserBill';
import {DeleteBill} from './Redux/Actions/DeleteBill';


function Nav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [check,setcheck]=useState(false)    
    const product = useSelector(state=>state.UserBillReducer.Product)
      const checkLogin = useSelector(state=>state.UpdateLoginReducer.login)
      const checkagain = useSelector(state=>state.UpdateLoginReducer)
      console.log(checkagain)
        useEffect(()=>
        {
            if(!check)
            {
               
                document.querySelector(".list").classList.remove('clickList')
                const arr=document.querySelectorAll(".ham");          
                arr[0].classList.remove("first")
                arr[1].classList.remove("second")
                arr[2].classList.remove("third")
            
            }
        },[check])
      const handleClick = (e)=>
      {
        e.preventDefault()
       document.querySelector(".list").classList.add("clickList");
       
       
        const arr=document.querySelectorAll(".ham");
        arr[0].classList.add("first")
        arr[1].classList.add("second")
        arr[2].classList.add("third")
        if(check)
        {
        setcheck(false)
        }
        else
        {
            setcheck(true)
        }//        const cross =document.querySelector(".hamburger")
        
    }
    const handleCheck = ()=>
    {
            setcheck(false)
    }
    const handleLogout = () =>
    {
        dispatch(UpdateLogin(false,checkagain.id,checkagain.admin))
        dispatch(clearUserData())
        dispatch(DeleteBill())
    }
    
        // console.log(data)
    return (
        
        <div className="nav" >
            <div className="hamburger" onClick={handleClick}>
            <div className="ham" ></div>
            <div className="ham"></div>
            <div className="ham"></div>
            </div>
                <div className="estore">EStore</div>
            <ul className="list">
                <li className="home" onClick={handleCheck}><Link to="/" >Home</Link></li>
                <li className={checkLogin?"setCart":"cart"} onClick={handleCheck}><Link to="/cart">Cart</Link><img  src={cartLogo} alt="img not found" className="logoCart"></img >
                <div className="count">{product}</div></li>
                {!checkLogin?<li className="login" onClick={handleCheck}><Link to="/login">Login</Link></li>:
                    <li className="logout" onClick={handleLogout}><Link to="/">Logout</Link></li>
                }
                <li className={checkLogin?"setOrders":"orders"} onClick={handleCheck}><Link to="/orders">Orders</Link></li>
    
                
            </ul>
         
        </div>
    
    )
}

export default Nav
