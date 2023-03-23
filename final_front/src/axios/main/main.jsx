import axios from 'axios'

/*********************
 * params None; DB에서 CURDATE()로 처리
 * return Array[]
 *********************/
export const getFestivalTodayDB = async () => {
    const result = await axios({
        method: "GET",
        url:
            "http://localhost:8888/api/concertToday"
        // process.env.BACKEND_URL + "api/concertToday"
    }).then(res => res.data)
    // console.log(result);
    return result
}

/*********************
 * params None; 추후 Category("콘서트","축제" 등) 값으로 param 설정해서 재사용하도록 함
 * return Array[]
 *********************/
export const getConcertListDB = async () => {
    const result = await axios({
        method: "GET",
        url:
            "http://localhost:8888/api/concertList",
        // process.env.BACKEND_URL + "api/concertToday"
        params: { "category": "콘서트" }
    }).then(res => res.data)
    // console.log(result);
    return result
}
