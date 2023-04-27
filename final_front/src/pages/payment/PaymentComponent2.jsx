import React, { useEffect } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';

const PaymentComponent2 = () => {
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'K9EvRZw0DO29uB3MGhJ44';

  useEffect(() => {
    // 결제 위젯 초기화
    const initPaymentWidget = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // 또는 const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
      // 결제 위젯을 컨테이너에 마운트
      paymentWidget.mount('#payment-widget-container');
    };
    initPaymentWidget();
  }, []);

  return (
    <div>
      <h1>결제하기</h1>
      <div id="payment-widget-container"></div> {/* 결제 위젯이 표시될 컨테이너 */}
    </div>
  );
};

export default PaymentComponent2;