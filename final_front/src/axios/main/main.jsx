import axios from 'axios'
import React from 'react'

/*********************
 * 
 * return Array[]
 *********************/
export const getFestivalTodayDB2 = async () => {
    await axios({
        method: "GET",
        url:
            "http://localhost:8888/api/concertToday"
        // process.env.BACKEND_URL + "api/concertToday"

    }).then(res => res.data)
    // .then(console.log)
}
export const getFestivalTodayDB = async () => {
    const result = await axios({
        method: "GET",
        url:
            "http://localhost:8888/api/concertToday"
        // process.env.BACKEND_URL + "api/concertToday"

    }).then(res => res.data)
    // .then(console.log)
    return result
}
