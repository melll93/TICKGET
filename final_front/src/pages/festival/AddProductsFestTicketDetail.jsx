import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FetivalDetailDB, festTicketInsertDB } from '../../axios/festival/festival';

const AddProductsFestTicketDetail = ({festTcType, festTcPrice, festTcTime}) => {
  const {festMId}=useParams();
  /* console.log('가격'+festTcType);
  console.log(festTcPrice); */

  
 /*  const [tickets, setTickets] = useState(
    Array.from({ length: festTcType.length }, () => ({
      no: '', // 좌석 정보의 개수
      seatType: '', // 티켓의 좌석 유형
      price: '', // 티켓의 가격
      festTime: '', // 티켓의 시간 정보
    }))
  );
 */
  const [tickets, setTickets] = useState(
    festTcType&&festTcType.map(() => ({
      no: '', // 좌석 정보의 개수
      seatType: '', // 티켓의 좌석 유형
      price: '', // 티켓의 가격
      time: '' // 티켓의 시간 정보
    }))
    );
    


  const addTicket = () => {
    const newTicket = {
      no:'', // 좌석 정보의 개수
      seatType:'', // 티켓의 좌석 유형
      price:'', // 티켓의 가격
      time: '' // 티켓의 시간 정보
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  }
  const removeTicket = (index) => {
    setTickets(prevTickets => prevTickets.filter((_, i) => i !== index));
  }





/* fest_tc */
const inputTcPrice = (index, price) => {
  setTickets(prevTickets => {
    const updatedTickets = [...prevTickets];
    updatedTickets[index].price = price;
    return updatedTickets;
  });
}


const inputTcSeatType = (index, seatType) => {
  setTickets(prevTickets => {
    const updatedTickets = [...prevTickets];
    updatedTickets[index].seatType = seatType;
    return updatedTickets;
  });
}

const inputTcTime = (index, time) => {
  setTickets(prevTickets => {
    const updatedTickets = [...prevTickets];
    updatedTickets[index].time = time;
    return updatedTickets;
  });
}

const festTicketInsert = async () => {
  for (const ticket of tickets) {

    const res = await festTicketInsertDB({
      festMId,
      festTcType: ticket.seatType,
      festTcPrice: ticket.price,
      festTcTime: ticket.time,
    });
    console.log(ticket);
    if (!res.data) {
      alert('error')
    } else {  
      alert('티켓정보가 저장되었습니다.')
    }
  }
};



  return (
    <div>
    <h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_ticket 추가 정보 입력 
    </h1>
<div className="input-group">
        <div className="form-floating" style={{ flex: '1' }}>
          <input
            type="number"
            className="form-control"
            disabled
            defaultValue={festTcType&&festTcType.length}
            style={{ width: '100%' }}
          />
          <label htmlFor="floatingInput">좌석정보</label>
        </div>
        <button type="button" className="btn-add-seat" onClick={addTicket}>
          좌석 추가
        </button>
        <button type="submit" className="btn-save" onClick={festTicketInsert}>
          저장
        </button>
      </div>
      <table className="table-seats"><thead>
          <tr>
          <th>no</th><th>시간    {/* fest_schedule  (fest_sc_time) */}
          </th><th>좌석정보  {/* fest_ticket   (fest_tc_type) */}
          </th><th>티켓가격  {/* fest_ticket   (fest_tc_price) */}
          </th><th style={{width:'120px'}}>총좌석수   {/* 리얼타임dv 예정 fest_seats   (fest_tc_total) */}
          </th><th style={{width:'60px'}}>삭제</th>
          </tr>
        </thead>
        <tbody>
        {tickets&&tickets.map((ticket, index) => (
            <tr key={index}><td>
                  {index+1}
              </td><td>
              <input
                  type="text"
                  className="form-control"
            value={festTcTime[index]}
                  onChange={(e) => inputTcTime (index, e.target.value)}
                />
              </td><td>
                <input
                  type="text"
                  className="form-control"
                  value={festTcType[index]}
                  onChange={(e) => inputTcSeatType(index, e.target.value)}
                />
              </td><td>
                <input
                  type="number"
                  className="form-control"
                  value={festTcPrice[index]}   
                  onChange={(e) => inputTcPrice (index, e.target.value)}
                style={{display:'inline-block', width:'80%'}}
                />원
              </td><td>
              <input
                  type="number"
                  className="form-control"
                style={{display:'inline-block', width:'75%'}}
                />석
              </td><td>
                <button type="button" className="btn-delete" onClick={() => removeTicket(index)}>
                  삭제
                </button>
              </td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddProductsFestTicketDetail
