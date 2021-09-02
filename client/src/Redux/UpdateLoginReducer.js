import { UPDATE_LOGIN } from "./Constants";


const initialState={login:false,admin:false}

export const UpdateLoginReducer =(state=initialState,action)=>
{

    switch(action.type)
    {
        case UPDATE_LOGIN:
            return{...state,login:action.payload.success,id:action.payload.id,admin:action.payload.admin}
        default:
            return state
    }



}