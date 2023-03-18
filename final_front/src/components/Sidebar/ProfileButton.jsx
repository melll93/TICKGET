import React from 'react'
import { Link } from 'react-router-dom'

const ProfileButton = () => {
    return (
        <div className='ProfileButton'>
            <div><Link to="/login">로그인</Link></div>
            <div><Link to='/join'>회원가입</Link></div>
        </div>
    )
}

export default ProfileButton