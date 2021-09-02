import {ADD, DECREASE_QUANTITY, DELETE_PRODUCT, GET_USERDATA, INCREASE_QUANTITY,CLEAR_USERDATA} from './Constants'


const initialState = []
    // userData : []


export const UserReducer = (state=initialState , action)=>
{
    switch(action.type)
    {
        case GET_USERDATA:
        return([...state.userData])
        

        case ADD:
            return([...state,action.payload])
        
        case INCREASE_QUANTITY:
            return(state.map((item)=>item.id===action.payload?{...item,quantity:item.quantity+1}:item))
            
           
        
        case DECREASE_QUANTITY:
            return(state.map((item)=>item.id===action.payload?{...item,quantity:item.quantity-1}:item))

        case DELETE_PRODUCT:
            return(state.filter((item)=>item.id!==action.payload))
        
        case CLEAR_USERDATA:
            return(state.userData=[])

        default:
        return state
    }
}

