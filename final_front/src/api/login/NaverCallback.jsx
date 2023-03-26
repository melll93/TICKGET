import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NaverCallback = ({ setLoginDomain }) => {
    const navigate = useNavigate();

    const sendToken = async (token) => {
        await axios({
            method: "POST",
            url: "http://localhost:8888/oauth/login/naver/callback",
            data: token
        }).then(console.log).catch((error) => console.log(error))
    }

    const token = window.location.hash.split('=')[1].split('&')[0];

    const getNaverToken = () => {
        window.localStorage.setItem("access_token", token)
        setLoginDomain("naver")
    }

    // const getProfile = async () => {
    //     const result = await axios.get("https://openapi.naver.com/v1/nid/me",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })

    //     return result
    // }

    useEffect(() => {
        getNaverToken()
        sendToken(token)
    }, [])

}

export default NaverCallback