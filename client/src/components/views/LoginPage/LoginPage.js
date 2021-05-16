import axios from 'axios';
// import { response } from 'express';
import React,{
    useState,
} from 'react'

import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {

    const dispatch=useDispatch();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        console.log('email, ', email);
        console.log('password, ', password);

        let body={
            email:email,
            password:password,
        }

        dispatch(loginUser(body))
            .then(response=>{
                if(response.payload.loginSuccess){
                    //페이지 이동 시 사용
                    props.history.push('/')
                }
                else{
                    alert('Error in login process');
                }
            })
        
    }

    return (
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                height:'100%',
            }}
        >
                <form 
                    style={{display:'flex', flexDirection:'column'}}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <input type="email" value={email} onChange={onEmailHandler} />
                    <label>password</label>
                    <input type="password" value={password} onChange={onPasswordHandler} />
                    <br />
                    <button>
                        Login
                    </button>
                </form>
        </div>
    )
}

export default withRouter(LoginPage);
