import {GET_DATA }from '../Constants'

export const GetData = (res)=>
{
  console.log(res.data)
    return{
        type:GET_DATA,
        payload:res.data
        }

}