import React, { useEffect, useState } from 'react'
import { don_boardListDB } from '../../axios/donation/donationLogic'
import DonationRow from './DonationRow'

const DonationList = () => {

  const [board,setBoard] = useState({
    cb_gubun:'qna_title',
    keyword:'PT10회권양도합니다.'
    })

  const [boards,setBoards] = useState([{
  }])
  
  useEffect(() => {
    don_boardListDB().then(setBoards);
  }, []);
  


  return (
    <>
        {boards.map(boards => (
              <DonationRow key={boards.don_bno} boards={boards}/>
            ))} 
    </>
  )
}

export default DonationList