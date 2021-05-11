import {
    LOGIN_USER
} from '../_actions/types';

//state: 전 state, 
export default function(state={}, action){
// key는 액션의 타입
    switch(action.key){
        case LOGIN_USER:
            return{
                ...state,
                loginSuccess:action.payload,
            }
        default:
            return state;
    }
}