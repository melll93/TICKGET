import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { naverLogin } from '../../pages/member/LoginPage';
const { naver } = window
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi"
const NAVER_CALLBACK_URL = encodeURI("http://localhost:3333/oauth/login/naver/callback");

const NaverLogin = ({ user, setUserInfo, setLoginDomain }) => {
    const navigate = useNavigate()

    const token = window.location.hash.split('=')[1].split('&')[0];

    const setToken = () => {
        window.localStorage.setItem("access_token", token)
        setLoginDomain("naver")
    }

    const status = window.location.href.split('=')[2].split('&')[0]
    // console.log(status);

    naverLogin.getLoginStatus(async () => {
        if (status) {
            // 아래처럼 선택하여 추출이 가능하고, 
            const userid = naverLogin.user.getEmail()
            const username = naverLogin.user.getName()
            console.log(userid);
            // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
            // setUserInfo(naverLogin.user)
        }
    })

    // const getProfile = async () => {
    //     const result = await axios({
    //         method: "GET",
    //         url: "https://openapi.naver.com/v1/nid/me",
    //         headers: {
    //             Authorization: "Bearer " + token
    //         }
    //     })
    //     navigate("/")
    //     return result
    // }

    useEffect(() => {
        setToken()
        // getProfile()
    })
    // return (
    //     <>
    //         {/* 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.
    //         태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다! */}
    //         <div id="naverIdLogin"> </div>
    //     </>
    // )
}



export default NaverLogin