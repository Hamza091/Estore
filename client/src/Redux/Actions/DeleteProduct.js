import { DELETE_PRODUCT } from "../Constants"

export const DeleteProduct = (id) =>
{
    return{
        type:DELETE_PRODUCT,
        payload:id
    }
}