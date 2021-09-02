import { USER_BILL } from "../Constants"

export const UserBill = (bill)=>
{
    console.log(bill)
    return{
        type: USER_BILL,
        payload: bill
    }
}