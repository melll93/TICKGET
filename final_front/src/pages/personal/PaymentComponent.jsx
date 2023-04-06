/* 은영 결제창 수정중 */
import { loadTossPayments } from "@tosspayments/payment-sdk";

import React from "react";

const PaymentComponent = () => {
  const clientKey = 'test_ck_YoEjb0gm23Pd54x1xek3pGwBJn5e'  // env로 옮길 예정 


  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      // process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
      clientKey
    );
    await tossPayments.requestPayment("카드", {   //첫번째 파라미터 - 카드, 가상계좌, 계좌이체, 휴대폰, 문화상품권, 도서문화상품권, 게임문화상품권 가능  // 두번째 파라미터-결제정보
      amount: 15000,   //fest_tk_price
      orderId: 'KjnHngSBVHXivyFnT4bMd',  //영문 대소문자, 숫자, 특수문자-,_,= 사용가능 (6~64자 이하 문자열)
      orderName: '은영 테스트 중_제품명  fest_m_title/fest_m_id',  //100자 이하 fest_m_id
      customerName: '은영 테스트 중_고객명  member_name',  //
      successUrl: `${window.location.origin}/paymentsucess/:festMId`,  // 성공시 리다이렉트 URL
      failUrl: `${window.location.origin}/paymentfailed/:festMId`,  //실패시 리다이렉트 URL - 안만들어놈
      // windowTarget:'self'
      // customerEmail:''  //결제결과 확인 이메일 
    }).catch(function (error) {
      if (error.code === 'USER_CANCEL') {     // 결제 고객이 결제창을 닫았을 때 에러

      } else if (error.code === 'INVALID_CARD_COMPANY') {        // 유효하지 않은 카드  에러
      }
    });
  };
  

  return (
    <>
        <div>
<button className="researvebtn" onClick={handleClick}> (토스) 결제하기 </button> 

    </div>
    </>
  );
};

export default PaymentComponent;
