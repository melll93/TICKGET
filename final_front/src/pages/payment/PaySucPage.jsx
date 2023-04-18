/* 은영 결제창 테스트중 */
import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from "react-router-dom"
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { mk_boardSellDB } from '../../axios/board/market/marketLogic'

const PaySucPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    let {param} = useParams()



/*  마켓 게시판 게시글 판매완료 처리  
     useEffect (() => {
    const boardSell = async() =>{
      const board = {
        board_mk_no : no //url 끝 번호
      }
      const res = await mk_boardSellDB(board)
      console.log(res.data);
    }
    boardSell()
  },[]) */


/*  결제성공 시 결제정보가 insert되어야함!
  useEffect (() => {
    const pInsert = async() =>
    const res = await paymentInsert(pData)
    console.log(res.data)
  }
  pInsert()  
  },[])
 */


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


