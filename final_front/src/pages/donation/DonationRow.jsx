  import React from 'react'

  const DonationRow = ({boards}) => {
    console.log(boards);
    return (
      <>
      <tr>
        <td style={{ textAlign:"center"}}>{boards.donBno}</td>
        <td style={{ textAlign:"center"}}>{boards.donTitle}</td>
        <td style={{textAlign:"center"}}>{boards.donTicketCount}</td>
        <td style={{textAlign:"center"}}>{boards.donTicketPrice}</td>
        <td style={{textAlign:"center"}}>{boards.donBoardDate}</td> 
        <td style={{textAlign:"center"}}>{boards.memName}</td>
        <td style={{textAlign:"center"}}>{boards.donBoardHit}</td> 
      </tr>
    </>
    )
  }

  export default DonationRow
