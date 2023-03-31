import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { qnaInsertDB, uploadImageDB } from '../../axios/board/boardLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../styles/formStyle'
import BoardFileInsert from './BoardFileInsert'
import QuillEditor from './QuillEditor'
import Button from "react-bootstrap/Button";

const Write = () => {
  const navigate = useNavigate()
  const no = sessionStorage.getItem("no");
  const [title, setTitle] = useState("")// 사용자가 입력한 제목 담기
  const [secret, setSecret] = useState("")// 사용자가 입력한 비번 담기
  const [content, setContent] = useState("")// 사용자가 입력한 내용 담기(태그포함된 값들)
  const [file_Name, setFileName] = useState("")//이미지 말고 첨부파일 이름 담기
  const [file_size, setFileSize] = useState("")//이미지 말고 첨부파일 크기 담기
   //QuillEditor 이미지 선택하면 imageUploadDB타면 스프링플젝 pds이미지 업로드
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
   const handleContent = useCallback((value) => { //QuillEditor에서 담김 - 태그포함된 정보
      setContent(value)
  },[])
  const boardInsert = async() => {
      const board = {
      qna_no : 0, //오라클 자동채번 하는 시퀀스 사용함
      qna_title: title,
      qna_content: content,
      qna_type:'양도',
      qna_secret:secret,
      qna_hit : 0,
      mem_no:no
      }
      const res = await qnaInsertDB(board)
      console.log(res)
      //window.location.replace("/board")
      navigate("/board")
  }
    const handleChange = async (event) => {
      console.log('첨부파일 선택'+event.target.value);
      //console.log(fileRef.current.value);
      //fileRef에서 가져온 값중 파일명만 담기
      const str = fileRef.current.value.split('/').pop().split('\\').pop()
      setFileName(str)
      console.log(str);
      //선택한 파일을 url로 바꾸기 위해 서버로 전달할 폼데이터 만들기
      const formData = new FormData()
      const file = document.querySelector("#file-input").files[0]
      formData.append("image", file)
      const res = await uploadImageDB(formData)
      console.log(res.data)
      const fileinfo = res.data.split(',')
      console.log(fileinfo)
      setFileName(fileinfo[0])
      setFileSize(fileinfo[1])
    }
  const handleFiles = () => {

  }
  return (
  <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>제목</h3>
              <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
              style={{width:"100%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>비밀번호</h3>
            </div>
            <input id="dataset-pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleSecret(e.target.value)}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>첨부파일</h3>
            </div>
            <input id="file-input" name='file_name' ref={fileRef} type="file" maxLength="50" className="visuallyhidden" onChange={handleChange}/>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}></div>
            <h3>상세내용</h3>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
                  <BoardFileInsert files = {files}/>
          </div>
        </FormDiv>
      </ContainerDiv>
          <div style={{ marginBottom: "20px" }}>
          <Button onClick={() => window.history.back()}>뒤로가기</Button>
          <Button style={{ marginLeft: "10px" }}onClick={() => navigate("/together")}
          >
            목록으로
          </Button>
          </div>
      </>
  )
}

export default Write;