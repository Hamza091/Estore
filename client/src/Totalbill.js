import React from 'react'
import {useSelector} from 'react-redux'
import './User_css/totalbill.css';
import {Link} from 'react-router-dom';
// import axios from 'axios'

function Totalbill() {
     const Amount = useSelector(state=>state.UserBillReducer.Amount)
     const Product = useSelector(state=>state.UserBillReducer.Product)
    //  const userData = useSelector(state=>state.UserReducer)
    //  console.log(userData)
    //  console.log(Product)
    //  console.log(Amount)
     
     return (
        <div className="bill">
        <h3 className="Head">Bill</h3>
        <div className="Amount">Amount:<span>$</span>{Amount.toFixed(2)}</div>
        <div className="Tax">Tax:<span>$</span>{(Product*10.30).toFixed(2)} </div>
        <div className="Total">Total Amount:<span>$</span>{(Amount+(Product*10.30)).toFixed(2)}</div>
        <button className="checkout"><Link to="/login" >Checkout</Link></button>
        </div>
    )
}

export default Totalbill
