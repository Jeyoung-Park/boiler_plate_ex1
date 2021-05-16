import axios from 'axios';
import React, { useEffect } from 'react'

import {auth} from '../_actions/user_action';

import {useDispatch} from 'react-redux';

//option
//null => 아무나 출입이 가능
//true => 로그인한 유저만 출입이 가능
//false => 로그인한 유저는 출입이 불가능

//adminRoute: 어드민 권한 여부 

export default function(SpecificComponent, option, adminRoute=null){


    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(()=>{

            dispatch(auth()).then(response=>{
                console.log(response);

                //로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('./login');
                    }
                }
                //로그인한 상태
                else{
                    //어드민만 들어갈 수 있는 페이지인 경우
                    if(adminRoute&&!response.payload.isAdmin){
                        props.history.push('/');
                    }
                    else{
                        if(option===false){
                            props.history.push('/');
                        }
                    }
                }
            })

        }, []);

        return(
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}