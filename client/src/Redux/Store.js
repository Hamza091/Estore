import {createStore,combineReducers} from 'redux'
import {DataReducer} from './DataReducer'
import { UserReducer } from './UserReducer'
import {UserBillReducer} from './UserBillReducer'
import {UpdateLoginReducer} from './UpdateLoginReducer'
import {GetOrdersReducer} from './GetOrdersReducer'

const rootReducer = combineReducers(
    {
        DataReducer,
        UserReducer,
        UserBillReducer,
        UpdateLoginReducer,
        GetOrdersReducer
    })
export const Store = createStore(rootReducer)



