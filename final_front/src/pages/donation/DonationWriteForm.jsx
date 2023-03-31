import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../styles/formStyle'
import QuillEditor from './QuillEditor'
import DonationFileDetail from './DonationFileDetail'
import { donationInsertDB, uploadFileDB } from '../../axios/donation/donationLogic'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'

const DonationWriteForm = () => {
  console.log('글쓰기 페이지 호출')
  const navigate = useNavigate()
  const no = window.sessionStorage.getItem('no') //세션에 저장된 회원번호값
  const [title, setTitle] = useState("") //사용자가 입력한 제목 담기
   const [secret , setSecret] = useState("") //사용자가 입력한 pw 담기
   const [content, setContent] = useState("") //사용자가 입력한 내용 담기
   const [ticketCount, setTicketCount] = useState("") //사용자가 입력한 내용 담기
   const [price, setPrice] = useState("") //사용자가 입력한 판매가격 담기
   const [file_name, setFilename] = useState("") //이미지 말고 첨부파일 이름 담기
   const [file_size, setFilesize] = useState("") //이미지 말고 첨부파일 크기 담기
   //QuillEditor이미지 선택하면 imageUploadDB타면 스프링플젝 pds 이미지 업로드
   //pds에 업로드된 파일을 읽어서 Editor안에 보여줌 imageGet?imageName=woman1.png
   const [files, setFiles] = useState([])
  
   const quillRef = useRef()
   const fileRef = useRef()



 //사용자가 입력한 값을 useState에 초기화 하기
 const handleTitle = useCallback((e) => {
  setTitle(e)
},[])

const handleSecret = useCallback((e) => {
  setSecret(e)
},[])


const handleContent = useCallback((value) => { //quilleditor에서 담김 - 태그포함된 정보
  setContent(value)
},[])


const handleTicketCount = useCallback((e) => {
  setTicketCount(e)
},[])

const handlePrice = useCallback((e) => {
  setPrice(e)
},[])

//글쓰기 버튼 클릭시 등록
const boardInsert = async() => {
const board = {

}
const res = await donationInsertDB(board)
console.log(res)

navigate("/donation")
}



/* const handleChange = async (event) => {
  console.log('첨부파일 선택'+event.target.value);
  //console.log(fileRef.current.value);
  //fileRef에서 가져온 값중 파일명만 담기
  const str = fileRef.current.value.split('/').pop().split('\\').pop()
  setFilename(str)
  console.log(str);
  //선택한 파일을 url로 바꾸기 위해 서버로 전달할 폼데이터 만들기
  const formData = new FormData()
  const file = document.querySelector("#file-input").files[0]
  formData.append("file_name", file)
  const res = await uploadFileDB(formData)
  console.log(res.data)
  const fileinfo = res.data.split(',')
  console.log(fileinfo)
  setFilename(fileinfo[0])
  setFilesize(fileinfo[1])
}
 */

const handleFiles = () => {

}



  return (
 <>
    <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>게시글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>글제목</h3> 
              <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
              style={{width:"50%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTitle(e.target.value)}}/>

        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
          <h3>비밀번호</h3> 
        </div>              
        <input id="dataset-pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
          style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleSecret(e.target.value)}}/>
<h3>공연 정보</h3> 
        <Row className="g-2">
      <Col md>
        <FloatingLabel controlId="floatingInputGrid" label="공연 이름">
          <Form.Control type="text" placeholder="name@example.com" />
        </FloatingLabel>
      </Col>
      <Col md>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="카테고리 선택"
        >
          <Form.Select aria-label="Floating label select example">
            <option value="1">콘서트</option>
            <option value="2">페스티벌</option>
          </Form.Select>
        </FloatingLabel>
      </Col>
    </Row>



            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>티켓 판매 수량</h3> 
            </div>              
            <input id="dataset-ticketCount" type="text" maxLength="50" placeholder="수량을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTicketCount(e.target.value)}}/>
            
    {/*         <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}> 
              <h3>첨부파일</h3> 
            </div>                      
            <input id="file-input" name='file_name' ref={fileRef} type="file" maxLength="50" className="visuallyhidden" onChange={handleChange}/>            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}/>
           
            */}
            <h3>상세내용</h3>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
           {/*  <DonationFileDetail files={files}/>  */}

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>판매등록가</h3> 
            </div>              
            <input id="dataset-price" type="text" maxLength="50" placeholder="판매가를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePrice(e.target.value)}}/>


          </div>
        </FormDiv>
      </ContainerDiv>
 
 </>
  )
}

export default DonationWriteForm
