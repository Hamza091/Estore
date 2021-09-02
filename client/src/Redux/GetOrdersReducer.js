import { GET_ORDERS } from "./Constants";

const initialState = []

export const GetOrdersReducer = (state = initialState , action) =>
{
    switch(action.type)
    {
        case GET_ORDERS:
            return state=action.payload
        default:
            return state
    }
}