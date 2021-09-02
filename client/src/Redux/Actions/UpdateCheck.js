import { UPDATE_CHECK } from "../Constants"

export const UpdateCheck =(id)=>
{
    return{
        type:UPDATE_CHECK,
        payload:id
    }
}