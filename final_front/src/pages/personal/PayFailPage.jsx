/* 은영 결제창 테스트중 */
import React from 'react'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { BButton } from '../../styles/formStyle'

const PayFailPage = () => {
  const navigate = useNavigate() 
    const [searchParams, setSearchParams] = useSearchParams()
    let {param} = useParams()

  return (
    <>
            <Sidebar />
      <div className="center">
        <Header />

        <div className="payment_center_div" style={{margin:'200px', textAlign:'center'}}>

      <h1>결제가 취소 되었습니다. </h1><br/><br/>
      <span>결제 승인 번호 : {` ${searchParams.get("orderId")}`}</span><br/>
      <div>결제 금액 : {` ${Number(searchParams.get("amount")).toLocaleString()}원`}</div><br/>
      
        <p> 상품 {param}의 구매에 실패하였습니다. </p>
        <Link to = "/">
          <button className="homebtn" style={{backgroundColor:'black', color:'white', borderRadius:'50px', width:'450px', height:'60px'}}> 메인으로 </button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default PayFailPage
