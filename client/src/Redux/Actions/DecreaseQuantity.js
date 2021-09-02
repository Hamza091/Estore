import { DECREASE_QUANTITY } from "../Constants"

export const DecreaseQuantity = (id) =>
{
    return{
        type:DECREASE_QUANTITY,
        payload:id
    }
}