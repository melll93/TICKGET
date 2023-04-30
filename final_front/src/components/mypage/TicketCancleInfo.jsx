import React, { useState } from 'react'

const TicketCancleInfo = () => {
  const [items, setItems] = useState([
    "예매한 티켓은 전체 취소만 가능합니다. 부분 취소는 불가능합니다",
    "티켓은 본인 확인을 위해 현장에서 받기만 가능합니다. 신분증 지참 부탁드립니다.",
    "공연시작일 24시간 전부터는 취소가 불가하며, 위약금 100% 발생하는 점 양해 부탁드립니다.",
    "일부 공연의 경우 상황에 따라 일괄 취소 건이 발생 할 수 있으며, 일괄 취소 시에는 수수료가 부과되지 않습니다",
    "티켓의 날짜/시간/좌석등급/좌석 위치 변경은 불가합니다. 자세한 안내는 고객센터 이용 부탁드립니다.",
  ]);

  return (
    <>
      <div style={{ padding: '16px', textAlign: 'left' }}>
        <h2 style={{ fontWeight: 'bold' }}><i className="bi bi-info-circle"></i>&nbsp;티켓 취소 안내</h2><br />
        {items.map((item, i) => (
          <p key={i}>
            <li>{item}</li>
          </p>
        ))}
      </div>
    </>
  )
}

export default TicketCancleInfo;