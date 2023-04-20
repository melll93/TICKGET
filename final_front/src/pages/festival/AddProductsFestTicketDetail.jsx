import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom';
import { festTicketInsertDB } from '../../axios/festival/festival';

const AddProductsFestTicketDetail = () => {
  const {festMId}=useParams();

  const [tickets, setTickets] = useState([]);
  const addTicket = () => {
    const newTicket = {
      no: '', // 좌석 정보의 개수
      seatType: '', // 티켓의 좌석 유형
      price: '', // 티켓의 가격
      festTcTime: '' // 티켓의 시간 정보
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  }
  const removeTicket = (index) => {
    setTickets(prevTickets => prevTickets.filter((_, i) => i !== index));
  }


/*   const [no, setNo]=useState([]);
const [seatType, setSeatsType] = useState([]);
const [price, setPrice] = useState([]);
const [seats, setSeats] = useState([]);
const [festTcTime, setFestTcTime] = useState([]);
 */


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

const inputTcTime = (index, festTcTime) => {
  setTickets(prevTickets => {
    const updatedTickets = [...prevTickets];
    updatedTickets[index].festTcTime = festTcTime;
    return updatedTickets;
  });
}

const festTicketInsert = async () => {
  for (const ticket of tickets) {
    let festTcTimeParsed;
    try {
    } catch (error) {
    }

    const res = await festTicketInsertDB({
      festMId,
      festTcType: ticket.seatType,
      festTcPrice: ticket.price,
      festTcTime: ticket.festTcTime,
    });
    console.log(ticket);
    if (!res.data) {
      // handle error
    } else {
      // handle success
    }
  }
};












/* function addLineNo() {
  setNo([...no, '']);
}

function removeSeat(index) {
  const newNo = [...no];
  newNo.splice(index, 1);
  setNo(newNo);
}
 */
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
            value={tickets.no}
            disabled
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
      <table className="table-seats">
        <thead>
          <tr>
          <th>no</th>   
            <th>시간</th>    {/* fest_schedule  (fest_sc_time) */}
            <th>좌석정보</th>  {/* fest_ticket   (fest_tc_type) */}
            <th>티켓가격</th>  {/* fest_ticket   (fest_tc_price) */}
            <th style={{width:'120px'}}>총좌석수</th>   {/* 리얼타임dv 예정 fest_seats   (fest_tc_total) */}
            <th style={{width:'60px'}}>삭제</th>
          </tr>
        </thead>
        <tbody>
        {tickets.map((ticket, index) => (
            <tr key={index}>
               <td>
                  {index+1}
              </td>
              <td>
              <input
                  type="text"
                  className="form-control"
                  onChange={(e) => inputTcTime (index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => inputTcSeatType(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => inputTcPrice (index, e.target.value)}
                style={{display:'inline-block', width:'80%'}}
                />원
              </td>
              <td>
              <input
                  type="number"
                  className="form-control"
                style={{display:'inline-block', width:'75%'}}
                />석
              </td>
              <td>
                <button type="button" className="btn-delete" onClick={() => removeTicket(index)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddProductsFestTicketDetail
