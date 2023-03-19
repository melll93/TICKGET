import React, { useEffect, useState } from 'react'
const { naver } = window
// const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi"
const NAVER_CALLBACK_URL = encodeURI("http://localhost:3333");
// const NAVER_CLIENT_SECRET = "h0Ym27vNUk"
let STATE_STRING = "RANDOM_STATE";
const NaverLogin = ({ user, setUserInfo }) => {

    const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_CALLBACK_URL,
        isPopup: false,
        loginButton: {
            color: 'green', type: 3, height: 50
        },
        callbackHandle: true,
    })

    const getUser = () => {
        naverLogin.getLoginStatus(async (status) => {
            if (status) {
                setUserInfo(user);
                console.log(user);
                window.close();
            }
        })
    }

    const naverLogout = () => {
        localStorage.removeItem("com.naver.nid.access_token");
        localStorage.removeItem("com.naver.nid.oauth.state_token");
        window.location.reload();
    }

    useEffect(() => {
        naverLogin.init()
        getUser()
    }, [])

    return (
        <>
            <div id="naverIdLogin" />
            {/* {user ? (
                <div>
                    <h2>네이버 로그인 성공!</h2>
                    <h3>사용자 이름</h3>
                    <div>{user.name}</div>
                    <h3>사용자 이메일</h3>
                    <div>{user.email}</div>
                    <h3>사용자 프로필사진</h3>
                    <img src={user.profile_image} alt="프로필 사진" />
                    <button onClick={naverLogout}>로그아웃</button>
                </div>
            ) : (
                // 네이버 로그인 버튼
                <div>
                    <div id="naverIdLogin"></div>
                </div>
            )} */}
        </>
    )
}



export default NaverLogin