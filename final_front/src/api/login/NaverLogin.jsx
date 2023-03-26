import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const { naver } = window
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi"
const NAVER_CALLBACK_URL = encodeURI("http://localhost:3333/oauth/login/naver/callback");

const NaverLogin = ({ user, setUserInfo }) => {
    const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_CALLBACK_URL,
        isPopup: false,
        loginButton: {
            color: 'green', type: 3, height: 50
        },
    })

    useEffect(() => {
        naverLogin.init()
    })

    return (
        <div id="naverIdLogin" className="loginbutton" > </div>
    )
}



export default NaverLogin