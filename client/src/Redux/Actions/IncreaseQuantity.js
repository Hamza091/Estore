import { INCREASE_QUANTITY } from "../Constants"

export const IncreaseQuantity=(productId)=>
{
  
    return{
        type:INCREASE_QUANTITY,
        payload:productId,
        
    }
}