import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {GetOrders} from './Redux/Actions/GetOrders'
import './User_css/grid.css'
function Orders() {
   // const [data,setData] = useState([])
   
   const dispatch = useDispatch()

   const userId = useSelector(state=>state.UpdateLoginReducer)
      useEffect(() => {

   
         if(userId.login){
         async function userdata()
         {
            try
            {
               await axios.get(`/api/orderdetails/${userId.id}`)
                           .then((res)=>dispatch(GetOrders(res.data)))
            }
            catch(err)
            {
               console.log(err)
            }
         }
            userdata()
      }
      
      }, [])

     const data = useSelector(state=>state.GetOrdersReducer)
      console.log(data)
       return (    
           userId.login? 
           <div className="grid">
              {/* <div className="orderDetails"> */}
               { data.map((item)=><div className="orderDetails">
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
         //   </div>
           :null
        )
}




export default Orders


// import React from 'react';

// export default function Orders() {
//   const [spacing, setSpacing] = React.useState(2);
//   const classes = useStyles();

//   const handleChange = (event) => {
//     setSpacing(Number(event.target.value));
//   };

//   const userId = useSelector(state=>state.UpdateLoginReducer)
//   if(userId.login)
//   {
//        async function  userData ()
//       {
//          const res =  await axios.get(`http://localhost:8888/api/orderdetails/${userId.id}`)
//          console.log(res.data)
//       }
//       userData()
//   }


//   return (
//      !userId.login?
//      <div className="grid">
//     </div>:null
//   );
// }


