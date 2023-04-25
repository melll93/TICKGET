import { loadTossPayments } from "@tosspayments/payment-sdk";

/* const paymentData = {
  amount,
  orderId,
  orderName,
  customerName,
  no,
};  */

export const handlePayment = async (paymentData) => {
  const tossPayments = await loadTossPayments(
    // process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    "test_ck_aBX7zk2yd8yjXw0pyNE3x9POLqKQ" //clientKey
  );
  await tossPayments
    .requestPayment("", {
      //첫번째 파라미터 - 카드, 가상계좌, 계좌이체, 휴대폰, 문화상품권, 도서문화상품권, 게임문화상품권 가능  // 두번째 파라미터-결제정보
      amount: paymentData.amount,
      orderId: paymentData.orderId,
      orderName: paymentData.orderName,
      customerName: paymentData.customerName,
      successUrl: `${window.location.origin}/paymentsuccess/:${paymentData.no}`,
      failUrl: `${window.location.origin}/paymentfailed/:${paymentData.no}`,
      flowMode: "DEFAULT",
      easyPay: "토스페이",
    })
    .catch(function (error) {
      if (error.code === "USER_CANCEL") {
      } else if (error.code === "INVALID_CARD_COMPANY") {
      }
    });
};
