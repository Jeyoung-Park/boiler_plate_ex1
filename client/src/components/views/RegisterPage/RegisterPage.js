import React,{
    useState,
} from 'react'

import {useDispatch} from 'react-redux';

import {registerUser} from '../../../_actions/user_action';

import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch=useDispatch();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value);
    }

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value);
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }

    
    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        if(password!==confirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body={
            email:email,
            password:password,
            name:name,
            
        }

        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    //페이지 이동 시 사용
                    props.history.push('/login')
                }
                else{
                    alert('Error in Register process');
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
                    
                    <label>Name</label>
                    <input type="text" value={name} onChange={onNameHandler} />
                    
                    <label>Password</label>
                    <input type="password" value={password} onChange={onPasswordHandler} />

                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />
                    <br />
                    <button>
                        Login
                    </button>
                </form>
        </div>
    )
}

export default withRouter(RegisterPage);
