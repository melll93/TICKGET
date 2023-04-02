import React from 'react'

const DonationRow = ({boards}) => {
  console.log(boards);
  return (
    <>
    <tr>
    <td>{boards.don_title}</td>
       <td>{boards.don_ticket_count}</td>
       <td>{boards.don_ticket_price}</td>
       <td>{boards.don_board_date}</td> 
       <td>{boards.mem_name}</td>
       <td>{boards.don_board_hit}</td> 
    </tr>
  </>
  )
}

export default DonationRow
