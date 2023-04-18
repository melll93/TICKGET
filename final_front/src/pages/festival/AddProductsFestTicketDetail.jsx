import React, { useState } from 'react'

const AddProductsFestTicketDetail = () => {
    const [seatType, setSeatsType] = useState([]);
const [price, setPrice] = useState([]);
const [seats, setSeats] = useState([]);

function handleSeatChange(e, index) {
  const newSeatType = [...seatType];
  newSeatType[index] = e.target.value;
  setSeatsType(newSeatType);
}

function handlePriceChange(e) {
  setPrice(e.target.value);
}

function handleSubmit(e) {
  e.preventDefault();
  alert({seatType, price });
}

function saveBtn(e) {
  e.preventDefault();
  alert({seatType, price, seats });
}


function addSeatType() {
  setSeatsType([...seatType, '']);
}

function removeSeat(index) {
  const newSeatType = [...seatType];
  newSeatType.splice(index, 1);
  setSeatsType(newSeatType);
}
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
            value={seatType.length}
            disabled
            style={{ width: '100%' }}
          />
          <label htmlFor="floatingInput">좌석정보</label>
        </div>

        <button type="button" className="btn-add-seat" onClick={addSeatType}>
          좌석 추가
        </button>
        <button type="submit" className="btn-save" onClick={saveBtn}>
          저장
        </button>
      </div>
      <table className="table-seats">
        <thead>
          <tr>
            <th>시간</th>    {/* fest_schedule  (fest_sc_time) */}
            <th>좌석정보</th>  {/* fest_ticket   (fest_tc_type) */}
            <th>티켓가격</th>  {/* fest_ticket   (fest_tc_price) */}
            <th style={{width:'120px'}}>총좌석수</th>   {/* 리얼타임dv 예정 fest_seats   (fest_tc_total) */}
            <th style={{width:'60px'}}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {seatType.map((seat, index) => (
            <tr key={index}>
              <td>
              <input
                  type="time"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={seat}
                  onChange={(e) => handleSeatChange(e, index)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={handlePriceChange}
                style={{display:'inline-block', width:'80%'}}
                />원
              </td>
              <td>
              <input
                  type="number"
                  className="form-control"
                  onChange={handlePriceChange}
                style={{display:'inline-block', width:'75%'}}
                />석
              </td>
              <td>
                <button type="button" className="btn-delete" onClick={() => removeSeat(index)}>
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
