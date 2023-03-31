/* 은영 결제창 테스트중 */
import React from 'react'
import { useSearchParams } from "react-router-dom"

const PaySucTestPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
  return (
    <div>
      <h1>결제 성공 페이지 테스트중 </h1>
      <div>{` ${searchParams.get("orderId")}`}</div>
      <div>{` ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>   
    </div>
  )
}

export default PaySucTestPage
