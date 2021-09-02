import {UPDATE_LOGIN} from './Constants'

export const UpdateLogin = (login) =>
{
    return{
        type:UPDATE_LOGIN,
        payload:login

    }
}