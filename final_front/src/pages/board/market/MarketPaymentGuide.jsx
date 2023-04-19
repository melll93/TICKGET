import React from 'react'

const MarketPaymentGuide = () => {
  return (
    <>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">상품 결제 안내</th>
    </tr>
  </thead>
  <tbody class="table-group-divider" >
    <tr>
      <th scope="row" style={{textAlign:'center'}}>결제방식</th>
      <td>카드, 가상계좌, 계좌이체, 휴대폰, 문화상품권, 무통장입금</td>
    </tr>
    <tr>
      <th scope="row" style={{textAlign:'center'}}>결제제한</th>
      <td>고객의 결제 안전을 위하여 신용카드 부정 사용 등 비정상적인 주문으로 판단될 경우, 상품주문 및 결제를 제한할 수 있습니다.</td>
    </tr>
    <tr>
      <th scope="row" style={{textAlign:'center'}}>유의사항</th>
      <td>결제 관련 문제 발생 시, 틱겟 고객센터 1644-0633으로 문의하여 주시기 바랍니다.</td>
    </tr>
  </tbody>
</table>

<table class="table" style={{marginTop:'50px'}}>
  <thead>
    <tr>
      <th scope="col">상품 수령 안내</th>
    </tr>
  </thead>
  <tbody class="table-group-divider" >
    <tr>
      <th scope="row" style={{textAlign:'center'}}>PIN거래	</th>
      <td>결제가 완료 되면 사이트에서 확인 후 구매자에게 해당 티켓의 PIN 번호 (E-ticket)를 발송하여 마이페이지에서 확인이 가능합니다.
         <br/>
PIN거래(즉시거래)상품은 SMS에서도 확인 가능하며 PIN번호가 발급되지 않았을 시 고객센터 1644-0633으로 문의해 주세요!</td>
    </tr>
    <tr>
      <th scope="row" style={{textAlign:'center'}}>직거래</th>
      <td>판매자와 채팅을 통해 충분한 소통을 거친 뒤 거래 하시기 바랍니다.
         <br/>
직거래 시 사전에 장소와 시간을 꼭 확인해주세요.

</td>
    </tr>
  </tbody>
</table>
    </>
  )
}

export default MarketPaymentGuide
