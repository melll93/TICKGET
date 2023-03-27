import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NaverCallback = () => {
    const navigate = useNavigate()
    const token = window.location.href.split('=')[1].split('&')[0]
    // const token = window.localStorage.getItem("access_token")
    const sendToken = async () => {
        await axios({
            method: "POST",
            url: "http://localhost:8888/oauth/login/naver/callback",
            data: token
        })
            .then(console.log)
            .catch((error) => console.log(error))
    }
    sendToken().then(navigate("/"));

}

export default NaverCallback