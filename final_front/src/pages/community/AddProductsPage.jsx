//상품등록 페이지 - 은영 - 수정중

import React, { useCallback, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router'
import axios from 'axios';





/* ========================= 상품 자체 등록 ============================ */         
const FestivalInsertDB = (festival) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method:"post",   //@RequestBody - 
        url: "http://localhost:8888/festival/festivalInsert",
        data:festival,  //post방식으로 전송시 반드시 data 속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};



const AddProducts = () => {

const navigate = useNavigate();
const[fest_title, setFesttitle] = useState("")
const[fest_location, setFestloc] = useState("")
const[fest_category, setFestcate] = useState("")
const[fest_startday, setFeststart] = useState("")
const[fest_endday, setFestend] = useState("")
const[fest_detail, setFestdetail] = useState("")
const[fest_price, setFestprice] = useState("")
const[fest_desc, setFestdesc] = useState("")

const festivalInsert=async()=>{
  const festival={
    fest_title,
    fest_location,
    fest_category,
    fest_startday,
    fest_endday,
    fest_detail,
    fest_price,
    fest_desc,
    }
    const res =await FestivalInsertDB(festival)
    if(!res.data){
    }
    else{
      navigate("/festival")
    }
}

const inuptTitle = useCallback((e) => {
  setFesttitle (e)
},[])
    const inputLocation = useCallback((e) => {
      setFestloc(e)
    },[])
    const inputCategory = useCallback((e) => {
      setFestcate(e)
    },[])
    const inputStartday = useCallback((e) => {
      setFeststart(e)
    },[])
    const inputEndday = useCallback((e) => {
      setFestend (e)
    },[])
    const inputDetail = useCallback((e) => {
      setFestdetail (e)
    },[])  
    const inputPrice = useCallback((e) => {
      setFestprice (e)
    },[])
    const inputDesc = useCallback((e) => {
      setFestdesc (e)
    },[])
    
    



  return (
    <>
<div style={{ textAlign:'center', width:'600px', marginLeft:'100px'}}><br/> {/* //등록 div 시작 */}
<input type="text" className="form-control" id="fest_categoty"onChange={(e)=>{inputCategory (e.target.value)}} />

{/* <select className="form-select" aria-label="Default select example" style={{width:'150px'}}>
  <option id="fest_category" selected>카테고리</option>
  <option value="FESTIVAL">FESTIVAL</option>
  <option value="CONCERT">CONCERT</option>
</select><br/> */}
<h2>상품 자체 등록</h2>
<div id="uploadImg">
          <img id="productsImgChange" className='thumbNail' src="https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload" alt="미리보기" />
        {/* - 가로x세로/배경색/글자색.확장자?text=텍스트(공백은+로) */}
        </div><br/>
 <input className="form-control" type="file" accept='image/*' id="productsImg" name="productsImg"/> <br/>
 <div className="form-floating mb-3">
  <input type="text" className="form-control" id="fest_title" onChange={(e)=>{inuptTitle(e.target.value)}} />
  <label htmlFor="floatingInput"> products name </label>
</div>
<div className="form-floating mb-3">
  <input type="text" className="form-control" id="fest_desc" onChange={(e)=>{inputDesc  (e.target.value)}}/>
  <label htmlFor="floatingInput"> desc </label>
</div>
<div className="form-floating">
  <input type="text" className="form-control" id="fest_location"onChange={(e)=>{inputLocation (e.target.value)}} />
  <label htmlFor="floatingInput">location</label>
</div><br />
<div className="form-floating">
  <input type="number" className="form-control" id="fest_price" name="price" onChange={(e)=>{inputPrice (e.target.value)}}/>
  <label htmlFor="floatingInput">price</label>
</div><br />
<div className="form-floating mb-3">
  <input type="date" className="form-control" id="fest_startday" name="startDay" onChange={(e)=>{inputStartday (e.target.value)}}/>
  <label htmlFor="floatingInput"> 행사시작일 </label>
</div>
<div className="form-floating mb-3">
  <input type="date" className="form-control" id="fest_endday" name="startDay" onChange={(e)=>{inputEndday (e.target.value)}}/>
  <label htmlFor="floatingInput"> 행사종료일 </label>
</div>
 <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="fest_detail" style={{height: '300px',}} onChange={(e)=>{inputDetail (e.target.value)}}></textarea>
  <label htmlFor="floatingTextarea2">상세내용</label>
</div><br/>
<button type="button" className="btn btn-dark" onClick={()=>{navigate(-1)}}>취소</button>&nbsp;
<button type="button" className="btn btn-dark" onClick={festivalInsert}>상품등록하기</button>
</div>  {/* //등록 div 끝 */}
    </>
  )
}
/* ========================= 상품 자체 등록 끝============================ */






const AddProductsPage = () => {
  return (
    <>
      <Sidebar />
      <div className='center'>
        <Header />
        상품등록페이지
        <AddProducts />

      </div>
    </>
  )
}

export default AddProductsPage
