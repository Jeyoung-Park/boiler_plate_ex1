import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER,
} from '../_actions/types';

//state: 전 state, 
export default function(state={}, action){
// key는 액션의 타입
    switch(action.type){
        case LOGIN_USER:
            return{
                ...state,
                loginSuccess:action.payload,
            }
        case REGISTER_USER:
            return{
                ...state,
                register:action.payload
            }
        case AUTH_USER:
            return{
                ...state,
                userData:action.payload
            }
        default:
            return state;
    }
}