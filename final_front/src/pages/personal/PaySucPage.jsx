/* 은영 결제창 테스트중 */
import React from 'react'
import { Link, useParams, useSearchParams } from "react-router-dom"
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const PaySucPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    let {param} = useParams()
  return (
    <>
            <Sidebar />
      <div className="center">
        <Header />

        <div className="payment_center_div" style={{margin:'180px', textAlign:'center'}}>

      <h1>결제가 정상적으로 진행되었습니다. </h1><br/>
      <h1>감사합니다.</h1><br/>
      <span> 주문 번호 : {` ${searchParams.get("orderId")}`}</span><br/>
      <div>결제 금액 : {` ${Number(searchParams.get("amount")).toLocaleString()}원`}</div><br/>
        <p> 상품 {param}의 구매가 완료되었습니다. </p>
        <Link to = "/">
          <button className="homebtn" style={{backgroundColor:'black', color:'white', borderRadius:'50px', width:'450px', height:'60px'}}> 계속 쇼핑하기 </button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default PaySucPage


