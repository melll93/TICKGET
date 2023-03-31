/* 은영 결제창 테스트중 */
import React from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const PaySucTestPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    let {param} = useParams()
  return (
    <div>
            <Sidebar />
      <div className="center">
        <Header />
      <h1>결제 성공 페이지 테스트중 </h1>
      <div>결제 승인 번호 : {` ${searchParams.get("orderId")}`}</div>
      <div>결제 금액 : {` ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>   
      </div>
        <p>현재 페이지의 파라미터는 {param} 입니다. </p>

    </div>
  )
}

export default PaySucTestPage
