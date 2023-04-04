import React, { useEffect, useState } from 'react'
import { don_boardListDB } from '../../axios/donation/donationLogic'
import DonationRow from './DonationRow'

const DonationList = () => {
  const [boards,setBoards] = useState([{
  }])


  useEffect(()=>{
   const boardList = async()=>{//비동기 처리로 요청
     const res = await don_boardListDB(/* board */) // async가 있을 때 await사용 가능함
     console.log(res.data)
     setBoards(res.data)
   }
   boardList()
 },[]
 )
 
  return (
    <>
        {boards.map(boards => (
              <DonationRow key={boards.don_bno} boards={boards}/>
            ))}
    </>
  )
}

export default DonationList