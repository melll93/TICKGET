import React, { useCallback, useState } from 'react'
import "../../styles/festivaldetails.css";
import AddProductsFestTicketDetail from './AddProductsFestTicketDetail';



const AddProductsOptionalDetail = () => {

  const[festDetailCasting, setFestDetailCasting] = useState("")
  const[festDetailCrew, setFestDetailCrew] = useState("")
  const[festDetailRuntime, setFestDetailRuntime] = useState(0)
  const[festDetailAge, setFestDetailAge] = useState(0)
  const[festTicketSeat, setFestTicketSeat] = useState(0)
  const[festTicketPrice, setFestTicketPrice] = useState(0)

/////연습////


  /////연습////
  const inputCasting = useCallback((e) => {
    setFestDetailCasting (e)
  },[])
  const inputCrew= useCallback((e) => {
    setFestDetailCrew (e)
  },[])
  const inputRuntime= useCallback((e) => {
    setFestDetailRuntime (e)
  },[])
  const inputAge= useCallback((e) => {
    setFestDetailAge (e)
  },[])
  const inputSeat= useCallback((e) => {
    setFestTicketSeat (e)
  },[])
  const inputPrice= useCallback((e) => {
    setFestTicketPrice (e)
  },[])




  return (
    <>
      {/* fest_detail  */}
<div>
    <h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_detail 추가 정보 입력 
    </h1>

    <div className="form-floating">
  <input type="text" className="form-control" id="festDetailCasting"onChange={(e)=>{inputCasting (e.target.value)}} />
  <label htmlFor="floatingInput">캐스팅정보</label>
</div><br />
<div className="form-floating">
  <input type="text" className="form-control" id="festDetailCrew"onChange={(e)=>{inputCrew (e.target.value)}} />
  <label htmlFor="floatingInput">제작진정보</label>
</div><br />
<div className="form-floating" style={{display:'flex'}}>
  <input type="number" className="form-control" id="festDetailRuntime" onChange={(e)=>{inputRuntime (e.target.value)}} style={{width:'150px', flex:'1'}}/>
  <label htmlFor="floatingInput">runtime</label><h3>분</h3>&nbsp;&nbsp;&nbsp;&nbsp;<h3>만</h3>
  <div className="form-floating"></div>
  <input type="number" className="form-control" id="festDetailCrew"onChange={(e)=>{inputAge (e.target.value)}} style={{width:'150px', flex:'1'}} />
  <h3>세 이상</h3>

</div><br />
</div>

{/* fest_poster */}

<h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_poster 추가 정보 입력 
    </h1>
    파일 상세이미지 업로드
            <input
          className="form-control"
          type="file"
          accept="image/*"
          id="festivalsImg"
        />




{/* fest_ticket */}
<AddProductsFestTicketDetail></AddProductsFestTicketDetail>


    </>
  )
}

export default AddProductsOptionalDetail
