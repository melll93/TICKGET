import React, { useCallback, useEffect, useInsertionEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {festTicketInsertDB, deleteFestTicketDB } from '../../axios/festival/festival';
import { firebaseConfig } from '../board/carpool/CarpoolBoardList';
import firebase from "firebase/compat/app";
import Swal from 'sweetalert2';


const AddProductsFestTicketDetail = ({ festTcNo, festTcType, festTcPrice, festTcTime}) => {
  const {festMId}=useParams();
/*    console.log('타입'+festTcType); */
 /*  console.log(festTcPrice); */ 





 const [dbTickets, setDbTickets] = useState(
   festTcType && festTcType
     .filter((_, index) => festTcType[index] !== null) // null인 요소 필터링
     .map((_, index) => ({
       no: festTcNo[index], // 좌석 정보의 개수
       seatType: festTcType[index], // 티켓의 좌석 유형
       price: festTcPrice[index], // 티켓의 가격
       time: festTcTime[index] // 티켓의 시간 정보
     }))
 );



  const [tickets, setTickets] = useState([
    {
      no: "", // 좌석 정보의 개수
      seatType: "", // 티켓의 좌석 유형
      price: "", // 티켓의 가격
      time: "", // 티켓의 시간 정보
      seat:'',  //fb넣을 총좌석수 
    },
  ]);
    

/*(신규입력용) 좌석추가 버튼 누를때 로우 추가  */
  const addTicket = () => {
    const newTicket = {
      no:'', // 좌석 정보의 개수
      seatType:'', // 티켓의 좌석 유형
      price:'', // 티켓의 가격
      time: '', // 티켓의 시간 정보
      seat:'',
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  }

 /* (신규입력용) 로우 삭제  */
  const removeTicket = (index) => {
    setTickets(prevTickets => prevTickets.filter((_, i) => i !== index));
  }




/* 티켓 로우 삭제 */
const deleteFestTcRow = async (index) => { // 매개변수 수정
  const festival = {
    fest_tc_no: festTcNo[index],
  }
  const res = await deleteFestTicketDB(festival);
  if (!res.data) {
    // 삭제 성공 시 처리할 로직
    setDbTickets(dbTickets)
  } else {
    alert("에러")
  }
};



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

const inputFbSeat = (index, seat) => {
  setTickets(prevTickets => {
    const updatedTickets = [...prevTickets];
    updatedTickets[index].seat = seat;
    return updatedTickets;
  });
}




const festTicketInsert = async () => {
  for (const ticket of tickets) {
    if (ticket.seatType === '' || ticket.price === ''|| ticket.time === '' || ticket.seat === '') {
      alert('빈칸이 존재합니다. 확인해주세요. ');
    } else {
      const res = await festTicketInsertDB({  
        festMId,
        festTcType: ticket.seatType,
        festTcPrice: ticket.price,
        festTcTime: ticket.time,
      });    
      if (!res.data) {
        alert('error');
      } 
      else {
        /* 성공 */
        alert('저장완료');
        const newTickets=[];
        setTickets(newTickets);
        const updatedDbTickets = [...dbTickets, ...tickets]; 
        setDbTickets(updatedDbTickets); 
      }
    }
  } /* for */
  insertData(tickets);
}; /* festTicketInsert */
 






/* fireBase  */

/* 초기화 */
const[festMData, setFestMData]=useState(null);

useEffect(() => {
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  database.ref().on("value", (snapshot) => {
    setFestMData(festMData);
  });
  return () => {
    database.ref().off();
  };
}, []); 

/* FireBase Insert */


const insertData = (tickets) => {
  for (const ticket of tickets) {
    if (ticket.seatType === '' || ticket.price === ''|| ticket.time === '' || ticket.seat === '') {
      alert('빈칸이 존재합니다. 확인해주세요. ');
    } else{
      const data = {
        [ticket.time+'-'+ticket.seatType]:{
          price: ticket.price,
          seatAvailable: ticket.seat,
          seatTotal: ticket.seat,
          time:ticket.time,
          type:ticket.seatType
        }
    }

  firebase.database().ref(`FestMId/${festMId}`).update(data)  //ref에 원하는 경로 적으면 됨. 안해놔서 비워둠
    .then(() => {
      console.log("데이터가 성공적으로 삽입되었습니다.");
    })
    .catch((error) => {
      console.error("데이터 삽입 중 오류가 발생하였습니다.", error);
    });
}};
}

/* READ */







/* fireBase */



  return (
    <div>
    <h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_ticket 추가 정보 입력  
<p style={{fontSize:'15px'}}>(상품 등록 후, 가능합니다.)</p>
    </h1>

    <div className="input-group">
        <div className="form-floating" style={{ flex: '1' }}>
          <input
            type="number"
            className="form-control"
            disabled
          defaultValue={dbTickets&&dbTickets.length} 
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


{/* DB 에 이미 있는 티켓정보 */}
    <table className="table-seats"><thead>
          <tr>
          <th>no</th><th>시간    {/* fest_schedule  (fest_sc_time) */}
          </th><th>좌석정보  {/* fest_ticket   (fest_tc_type) */}
          </th><th>티켓가격  {/* fest_ticket   (fest_tc_price) */}
          </th><th style={{width:'120px'}}>총좌석수   
          </th><th style={{width:'60px'}} >삭제</th>
          </tr>
        </thead>
        <tbody>
        {dbTickets&&dbTickets.map((ticket, index) => (
            <tr key={index}><td>
                  {index+1}
              </td><td>
              <span>{ticket.time}
                </span>
              </td><td>
             <span>
              {ticket.seatType}
              </span>
              </td><td>
                <div>
                {ticket.price}   원
                </div>
              </td><td>
              <div>
                {/* {festMData.[{ticket.time}].seat}
                 */}???석</div>
              </td><td>
                <button type="button" className="btn-delete" onClick={() => deleteFestTcRow(ticket.no, index)}>
                  삭제 {ticket.no}
                </button>
              </td></tr>
          ))}
        </tbody>
      </table><br/> <br/>



{/*  티켓 추가 입력 칸  */}
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
            <tr key={index}><td>  {dbTickets ? index + 1 + dbTickets.length : index + 1}
              </td><td>
              <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                      inputTcTime(index, e.target.value);
                  }}
                />
              </td><td>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                      inputTcSeatType(index, e.target.value);
                  }}
                />
              </td><td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                          inputTcPrice(index, e.target.value);
                  }}
                style={{display:'inline-block', width:'80%'}}
                />원
              </td><td>
              <input
                  type="number"
                  className="form-control"
                style={{display:'inline-block', width:'75%'}}
                              onChange={(e) => {
                          inputFbSeat(index, e.target.value);}}
                />{festMData}석
              </td><td>
                <button type="button" className="btn-delete" onClick={() => removeTicket(index)}>
                  삭제
                </button>
              </td></tr>
          ))}
        </tbody>
      </table>
      <div style={{textAlign:'left', paddingLeft:'20px'}}>
      </div>

    </div>
  )
}

export default AddProductsFestTicketDetail
