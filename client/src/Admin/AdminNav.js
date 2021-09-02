import React from 'react'
import '.././Admin_css/AdminNav.css'
import {Link} from 'react-router-dom'
import {UpdateLogin} from '.././Redux/UpdateLogin'
import {useSelector,useDispatch} from 'react-redux'

function AdminNav() {
    const dispatch = useDispatch()
    const credentials = useSelector(state=>state.UpdateLoginReducer)
    const Logout = ()=>
    {
        dispatch(UpdateLogin(false,credentials.id,credentials.admin))
    }
    return (
        <div className="navContainer">
            {/* products={add,delete,edit} , orders={see user orders , change status of orders} , login/logout */}
            <div className="navLogo"><p>Estore</p></div>
            <ul className="navBox">
                <li className="navLinks"><Link to="/products">Products</Link></li>
                <li className="navLinks"><Link to="/userorders">Orders</Link></li>
                <li className="navLinks"><Link to="/admin">Home</Link></li>
                {credentials.login?<li className="navLinks" onClick={Logout}><Link to="/">Logout</Link></li>:null}
            </ul>
        </div>
    )
}

export default AdminNav
