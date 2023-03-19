import React from 'react'
import { Link } from 'react-router-dom'

const HomeButton = () => {
    return (
        <Link to="/">
            <div className='HomeButton'>
                <img className="icon image40" src="logos/HOME.png" />
                <p>DOMAIN NAME</p>
            </div>
        </Link>
    )
}

export default HomeButton