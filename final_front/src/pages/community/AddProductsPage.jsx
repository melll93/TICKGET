//상품등록 페이지 - 은영 - 수정중

import React, { useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router'





/* ========================= 상품 자체 등록 ============================ */
const AddProducts = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ textAlign: 'center', width: '600px', marginLeft: '100px' }}> {/* //등록 div 시작 */}
        <h2>상품 자체 등록</h2>
        <div id="uploadImg">
          <img className='thumbNail' src="https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload" alt="미리보기" />
          {/* - 가로x세로/배경색/글자색.확장자?text=텍스트(공백은+로) */}
        </div><br />
        <input className="form-control" type="file" accept='image/*' id="productsImg" name="productsImg" /> <br />
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="ticketingName" />
          <label for="floatingInput"> products name </label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="ticketingDesc" />
          <label for="floatingInput"> desc </label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="tickettingLoc" />
          <label for="floatingInput">location</label>
        </div><br />
        <div class="form-floating">
          <input type="number" class="form-control" id="tickettingPrice" name="price" />
          <label for="floatingInput">price</label>
        </div><br />
        <div class="form-floating mb-3">
          <input type="date" class="form-control" id="ticketgintStartDate" name="startDay" />
          <label for="floatingInput"> 행사시작일 </label>
        </div>
        <div class="form-floating mb-3">
          <input type="date" class="form-control" id="ticketgintEndDate" name="startDay" />
          <label for="floatingInput"> 행사종료일 </label>
        </div>
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="ticketgintDetails" style={{ height: '300px', }}></textarea>
          <label for="floatingTextarea2">상세내용</label>
        </div><br />
        <button type="button" class="btn btn-dark" onClick={() => { navigate(-1) }}>취소</button>&nbsp;
        <button type="button" class="btn btn-dark">상품등록하기</button>
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
