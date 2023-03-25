import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NaverCallback = () => {
    const navigate = useNavigate();
    const dataToBack = async (userInfo) => {
        await axios({
            method: "POST",
            url: "http://localhost:8888/oauth/callback/login/naver",
            user: userInfo
        }).then(console.log).then(alert("로그인 성공")).catch((error) => console.log(error))
    }

    dataToBack();
    navigate("/");

    return (
        <div>NaverCallback</div>
    )
}

export default NaverCallback