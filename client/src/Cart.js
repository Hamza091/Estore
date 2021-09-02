import React,{useEffect} from 'react'
import './User_css/cart.css'
import {useSelector , useDispatch} from 'react-redux'
import { IncreaseQuantity } from './Redux/Actions/IncreaseQuantity'
import { DecreaseQuantity } from './Redux/Actions/DecreaseQuantity'
import { DeleteProduct } from './Redux/Actions/DeleteProduct'
// import { DeleteProduct } from './Redux/Actions/DeleteProduct'
import {UserBill} from './Redux/Actions/UserBill'
import './User_css/totalbill.css';
import {Link} from 'react-router-dom';
// import {UserBillReducer} from './Redux/UserBillReducer'
function Cart() {
   
    const userData = useSelector(state=>state.UserReducer)    
    const Amount = useSelector(state=>state.UserBillReducer.Amount)
     const Product = useSelector(state=>state.UserBillReducer.Product)
  
    const dispatch = useDispatch()
//    useEffect(() => {
//        dispatch(UserBillReducer({Amount:items.price}))
//    }, IncreaseQuantity())
    
    const increase = (items)=>
    {
        console.log(userData)
        dispatch(IncreaseQuantity(items.id))
        dispatch(UserBill({totalAmount:items.price,Product:0}))
        console.log(userData)
  
    }
    const decrease = (items)=>
    {
        dispatch(DecreaseQuantity(items.id))
        dispatch(UserBill({totalAmount:-items.price,Product:0}))
    }
    const deletep = (items)=>
    {
        dispatch(DeleteProduct(items.id))
        dispatch(UserBill({totalAmount:-(items.price*items.quantity),Product:-1}))
      
    }
    
    return (
        
         <div className="cartt">
        {userData.length===0?null:
            <tbody className="tablebody">
            <tr ><th className="producttitle">Product Name</th><th className="productprice">Product Price</th><th className="productquantity">Product Quantity</th><th className="productamount">Total Amount</th></tr>
            {userData.map((items)=><tr key={items.id} >
                <td className="titlecolumn">{items.title}</td>
                <td className="pricecolumn">{items.price}</td>
                <td className="quantitycolumn"><button className="increase" onClick={()=>increase(items)}>+</button>{items.quantity}
                <button className="decrease" onClick={ items.quantity>1?()=>decrease(items):null}>-</button></td>
                <td className="totalpricecolumn" >${(items.quantity*items.price).toFixed(2)}</td>
                <td className="deletebtncolumn"><button className="delete" onClick={()=>deletep(items)}>Delete</button></td>
                
            </tr>)
        
            }
        
        </tbody>
        }
        {userData.length===0?null: <div className="bill">
        <h3 className="Head">Bill</h3>
        <div className="Amount">Amount:<span>$</span>{Amount.toFixed(2)}</div>
        <div className="Tax">Tax:<span>$</span>{(Product*10.30).toFixed(2)} </div>
        <div className="Total">Total Amount:<span>$</span>{(Amount+(Product*10.30)).toFixed(2)}</div>
        <button className="checkout"><Link to="/login" >Checkout</Link></button>
        </div>}
        </div>

)
        
}

export default Cart
