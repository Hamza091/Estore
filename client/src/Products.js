import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import './User_css/Products.css'
import { SettingsBrightness } from '@material-ui/icons'
import {GetData} from './Redux/Actions/GetData'

function Products() {
    const Data = useSelector(state => state.DataReducer)
    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [image,setImage] = useState("")
    const [btn , setBtn] = useState("Add")
    const [id , setId] = useState("")
    const [obj , setObj] = useState({})
    const Dispatch = useDispatch()
    const createProd = (prop)=>
    {
       const elem = document.querySelector(".createProduct")
       setBtn("Add")
       if(prop==="none")
       {
           
           setName("")
           setPrice("")
           setDescription("")
           setCategory("")
           setImage("")
        }
        elem.style.display=prop
    }
    const editBtn = (item)=>
    {
        setObj({prevName:item.title,prevPrice:item.price,prevDesc:item.description,prevCategory:item.category,prevImage:item.image})
        setName(item.title)
        setPrice(item.price)
        setDescription(item.description)
        setCategory(item.category)
        setImage(item.image)
        setId(item._id)
        createProd("flex")
        setBtn("Edit")

    }
    async function deleteBtn(id)
    {
        const res = await axios.post('/api/deleteproduct'  ,{
            data:{id}
        }
        )
        if(res.data.success)
        {
            alert("Product deleted successfully...")
            const resp = await axios.get('/api/getdata')
            Dispatch(GetData(resp))
        }
        else
        {
            alert("Something went wrong...")
        }
    }
    async function postProduct()
    {
        if(btn==="Edit")
        {
            if(obj.prevName!==name||obj.prevPrice!==price||obj.prevDesc!==description||obj.prevCategory!==category||obj.prevImage!==image)
            {
                const res = await axios.post('/api/updateproduct',
                {
                    data:{id,name,price,description,category,image}
            })
            console.log(res)
                if(res.data.success)
                {
                    alert("product updated...")
                    createProd("none")
                    const resp = await axios.get('/api/getdata')
                    Dispatch(GetData(resp))
                }
                else
                {
                    alert("something went wrong..")
                }
            }
            else
            {
                createProd("none")
            }
        }
        else
        {
        try
        {
            const res = await axios.post('/api/postnewproduct',{data:{
                name,price,description,category,image
            }}
            )
            console.log(res)
            alert("Product Added...")
            const resp = await axios.get('/api/getdata')
            Dispatch(GetData(resp))
            // const resp = await axios.get('http://192.168.0.103:8888/api/postnewproduct')
            // Dispatch(resp)
        }
        catch(err)
        {
            console.log(err)
            alert("Something went wrong...")
        } 
        createProd("none")
    }
    }
    return (
        <>
        <div className="prodHead">
            <p>Products</p>
            <button className="proBtn" onClick={()=>createProd("flex")}>Create Product</button>
        </div>
        <div className="proTable">
            <tbody className="proBody">
            <tr ><th>Id</th><th >Name</th><th > Price</th><th >Category</th><th>Edit</th><th>Delete</th></tr>
                {Data.map((items)=><tr key={items._id} >
                <td>{items._id}</td>
                <td >{items.title}</td>
                <td >{items.price}</td>
                <td>{items.category}</td>
                <td><button className="secBtn" onClick={()=>editBtn(items)}>Edit</button></td>
                <td><button className="secBtn" onClick={()=>deleteBtn(items._id)}>Delete</button></td>
                {/* <td className="quantitycolumn"><button className="increase" onClick={()=>increase(items)}>+</button>{items.quantity}
                <button className="decrease" onClick={ items.quantity>1?()=>decrease(items):null}>-</button></td> */}
                
                {/* <td className="deletebtncolumn"><button className="delete" onClick={()=>deletep(items)}>Delete</button></td> */}
                
            </tr>)
        
            }
            </tbody>
        </div>
        <div className="createProduct">
            <div className="closeBtn" onClick={()=>createProd("none")}>X</div>
            <div className="prodInputs">
            <label>Name: </label>
            <input value={name} onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div className="prodInputs">
            <label >Price: </label>
            <input value={price}  onChange={(e)=>setPrice(e.target.value)}></input>
            </div>
            <div className="prodInputs">
            <label>Description: </label>
            <input value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            </div>
            <div className="prodInputs">
            <label >Category: </label>
            <input value={category} onChange={(e)=>setCategory(e.target.value)}></input>
            </div>
            <div  className="prodInputs">
            <label >Image</label>
            <input value={image} onChange={(e)=>setImage(e.target.value)}></input>
            <button className="proBtn" onClick={()=>postProduct()}>{btn} Product</button>
            </div>
        </div>
        </>
    )
}

export default Products
