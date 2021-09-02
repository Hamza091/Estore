import React from 'react'; 
import Nav from './Nav';
import Main from './Main';
import Cart from './Cart';
import Login from './Login';
import Orders from './Orders';
import { Route , Switch } from 'react-router-dom';
import {Provider,useSelector} from 'react-redux'
import {Store} from './Redux/Store'
import Register from './Register'
import Admin from './Admin/Admin'
import Products from './Products'
import AdminNav from './Admin/AdminNav'
import UserOrders from './Admin/UserOrders'

function App() {
  const admin = useSelector(state => state.UpdateLoginReducer.admin)

  console.log(admin)
    return (
      <Provider store={Store}> 
    {/* <Nav /> */}
     <Route exact path={["/","/cart","/orders"]} component={Nav}/>
     {admin?
     <Route exact path={["/admin","/products","/userorders"]} component={AdminNav}/>
     :
     null}
         <Switch>
           {
              !admin?
              <Route  exact path="/" component={Main} />
              :
              <Switch>
              
              <Route  path="/admin" component={Admin} />
              <Route path="/products" component={Products}/>
              <Route path="/userorders" component={UserOrders}/>
              </Switch>
           }
     {/* <Route  exact path="/" component={Main} />
      <Route path="/admin" component={Admin} /> */}
     <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/orders" component={Orders}   />
      {/* <Route path="/products" component={Products} /> */}
      </Switch>
  </Provider>
   
  );
 
  }

export default App;
