//상품등록 페이지 - 은영 - 수정중

import React, { useState } from 'react'
import Gnb from '../../components/Gnb'
import Sidebar from '../../components/Sidebar'
import { Button, Form } from 'react-bootstrap'




/* 상 품 추가  */
const AddProducts=()=>{
    return(
        <>
        <Form id="f_dept" method="get">
          <input type="hidden" id="fileName" name="fileName"/>
          <input type="hidden" id="fileURL" name="fileURL"/>
          <Form.Group className="mb-3" controlId="formBasicDname">
            <Form.Label>상품명</Form.Label>
            <Form.Control type="text" name="pname" placeholder="Enter 상품명" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDname">
            <Form.Label>상세설명</Form.Label>
            <Form.Control type="text" name="desc" placeholder="Enter 상세설명" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLoc">
            <Form.Label>지역</Form.Label>
            <Form.Control type="text" name="loc" placeholder="Enter 지역" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLoc">
            <Form.Label>티켓금액</Form.Label>
            <Form.Control type="number" name="price" placeholder="--원" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLoc">
            <Form.Label>행사시작일</Form.Label>
            <Form.Control type="date" name="startDay"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLoc">
          <Form.Label>행사종료일</Form.Label>
            <Form.Control type="date" name="endDay" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOffice">
            <Form.Label>이미지</Form.Label>
              <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg"/>
          </Form.Group>
          <div id="uploadImg">
            <img className='thumbNail' src="http://via.placeholder.com/200X250" alt="미리보기" />
          </div>
        <Button type="submit" formAction='' >상품등록하기</Button>
        </Form>
    </>
)
}





const AddProductsPage = () => {
  return (
    <>
        <Sidebar />
        <div className='center'>
        <Gnb />
      상품판매
      <AddProducts/>
 
        </div>
    </>
  )
}

export default AddProductsPage
