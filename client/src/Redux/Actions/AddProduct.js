import {ADD} from '../Constants'



export const AddProduct = (product)=>
{
 
    return{
        type: ADD,
        payload: product
    }
}