import React,{useEffect} from 'react'
import {GetOrders} from '.././Redux/Actions/GetOrders'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'

function UserOrders() {
    const dispatch = useDispatch()
    
    let credentials = useSelector(state=>state.UpdateLoginReducer)
        useEffect(() => {
       async function getdata(){
        try
        {
            
            console.log(credentials)
            const res = await axios.get('/api/getuserorders',
            {
                params:{
                    "isAdmin":credentials.admin
                }
            })
            console.log(res)
            dispatch(GetOrders(res.data.response))
        }
        catch(err){console.log(err)}
       }
       getdata()
    } , [])
    let data = useSelector(state=>state.GetOrdersReducer)
    console.log(data)
    return (
        <div className="grid">
              { data.map((item)=><div className="orderDetails">
                  <span className="label">Name:</span> {item.userName}<br />
                  <span className="label">Order Id:</span> <span className="productInfo">{item._id}</span><br />
                  <span className="label">Number of Products:</span> {item.noOfProducts}<br />
                  <span className="label"> Total Amount:</span> {item.totalAmount}<br />
                  <span className="label">Status:</span> <span className="status">Pending</span><br />
                  <span className="productHead">Product Details</span>
                     {item.userProducts.map((product)=><div >
                        <span className="label">Title:</span> {product.title}<br />
                        <span className="label">Quantity:</span> {product.quantity}<br />
                        <span className="label">Price:</span> {product.price}<br />
                        </div>)}         
                  </div>)} 
        </div>
    )
}

export default UserOrders
