import React, { useEffect } from 'react'
import axios from 'axios';

const { naver } = window
const NAVER_CLIENT_ID = "3fiEhnoQMSqSfg5o2LKi"
// const NAVER_CALLBACK_URL = encodeURI("http://localhost:3333/oauth/login/naver");
const NAVER_CALLBACK_URL = encodeURI("http://localhost:3333/");
//http://localhost:3333/#access_token=AAAAN1yPkCNxN_H4t9fHu4fu8xMLFu3g5kMAv1Yq_efgQo8d17JgD_MglisvXUXy8mbm2pV3dmYQ74NqrF5vzcWwF-I&state=a13651c0-e814-4222-b264-328640ef6f65&token_type=bearer&expires_in=3600
// const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
// const NAVER_CLIENT_SECRET = "h0Ym27vNUk"

const NaverLogin = ({ user, setUserInfo }) => {

    const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_CALLBACK_URL,
        isPopup: true,
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



    useEffect(() => {
        naverLogin.init()
        getUser()
        // dataToBack()
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