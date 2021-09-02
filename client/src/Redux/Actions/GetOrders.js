
import {GET_ORDERS} from '../Constants'

export const GetOrders = (res) =>
{
    console.log(res)
    
    return{
        type:GET_ORDERS,
        payload:res
    }
    
}