import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { mk_boardDetailDB, mk_boardUpdateDB } from '../../axios/market/marketLogic'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { ContainerDiv, FormDiv, HeaderDiv } from '../../styles/formStyle'
import MarketFileInsert from './MarketFileInsert'
import QuillEditor from './QuillEditor'

const MarketUpdatePage = () => {
   const navigate = useNavigate()
   
   const {no} = useParams() //보드헤더에서 해시값 가져옴
   console.log(no)


   const [board_mk_title, setTitle] = useState(""); //사용자가 입력한 제목 담기
   const [mk_ticket_place, setTicketPlace] = useState(""); //판매할 티켓의 공연장소
   const [mk_ticket_date, setTicketDate] = useState(""); //판매할 티켓의 공연일
   const [mk_ticket_seat, setTicketSeat] = useState(""); //판매할 티켓의 좌석정보
   const [mk_ticket_count, setTicketCount] = useState(); //판매할 티켓의 수량
   const [mk_ticket_price, setTicketPrice] = useState(""); //사용자가 입력한 판매가격
   const [file_name, setFilename] = useState(""); //이미지 말고 첨부파일 이름 담기
   const [file_size, setFilesize] = useState(""); //이미지 말고 첨부파일 크기 담기
   const [board_mk_content, setContent] = useState(""); //사용자가 입력한 내용 담기
   //QuillEditor이미지 선택하면 imageUploadDB타면 스프링플젝 pds 이미지 업로드
   //pds에 업로드된 파일을 읽어서 Editor안에 보여줌 imageGet?imageName=woman1.png
   const [files, setFiles] = useState([]);
 
   const quillRef = useRef();
   const fileRef = useRef();



   useEffect (() => {
    //상세보기 한 건만 가져와야함
    const boardDetail = async() => {
    const board = {
      boardMkNo : no,
    }
    const res = await mk_boardDetailDB(board)
    const temp = JSON.stringify(res.data) // 문자열 전환
    console.log(temp)
    const jsonDoc = JSON.parse(temp) // 배열 접근 처리
    console.log(jsonDoc)
    setTitle(jsonDoc[0].boardMkTitle)
    setTicketPlace(jsonDoc[0].mkTicketPlace)
    setTicketDate(jsonDoc[0].mkTicketDate)
    setTicketSeat(jsonDoc[0].mkTicketSeat)
    setTicketCount(jsonDoc[0].mkTicketCount)
    setTicketPlace(jsonDoc[0].mkTicketPlace)
    setContent(jsonDoc[0].boardMkContent)

    //작성자가 아니면 수정 불가능함. 회원가입 DB 처리되면 board_market에 임시로 작성한 memName -> memNo 수정해야함 230406
   /* if(jsonDoc[0].memNo !== sessionStorage.getItem('no')){ //회원번호로 작성자가 맞는지 판단함 (맞으면 수정 가능)
       alert("수정 권한이 없습니다. [작성자 불일치]")
    } */
  }
  boardDetail()
   },[no])
   



 
   //사용자가 입력한 값을 useState에 초기화 하기
   const handleTitle = useCallback((e) => {
     setTitle(e);
   }, []);
 
 
   const handleTicketPlace = useCallback((e) => {
     setTicketPlace(e);
   }, []);
 
   const handleTicketDate = useCallback((e) => {
     setTicketDate(e);
   }, []);
 
   const handleTicketSeat = useCallback((e) => {
     setTicketSeat(e);
   }, []);
 
   const handleTicketCount = useCallback((e) => {
     setTicketCount(e);
   }, []);
 
   const handleTicketPrice = useCallback((e) => {
     setTicketPrice(e);
   }, []);
 
   const handleFiles = useCallback(
     (value) => {
       setFiles([...files, value]); //deep copy
     },
     [files]
   );
 
   const handleContent = useCallback((value) => {
     //quilleditor에서 담김 - 태그포함된 정보
     setContent(value);
   }, []);






  
   const boardUpdate = async() => {
   const board = {
    boardMkNo : no,
    boardMkTitle : board_mk_title,
    boardMkContent: board_mk_content,
    mkTicketPlace: mk_ticket_place,
    mkTicketDate: mk_ticket_date,
    mkTicketSeat: mk_ticket_seat,
    mkTicketCount: mk_ticket_count,
    mkTicketPrice: mk_ticket_price,
   }
   const res = await mk_boardUpdateDB(board)
   if(!res.data) return console.log('게시글 수정 실패')
   navigate("/market")

   }








  return (
    <>
    
    <Sidebar />
      <div className="center">
        <Header />
        <ContainerDiv>
          <HeaderDiv>
            <div className="form-floating mb-3">
              <h3 style={{ marginLeft: "450px" }}>티켓 중고판매 글 수정</h3>
            </div>
          </HeaderDiv>

          <FormDiv style={{ width: "1000px" }}>
            <hr style={{opacity:'0%'}}/>
            <div>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridTitle">
                  <h3>제목</h3>
                  <Form.Control
                    id="board_mk_title"
                    type="text"
                    placeholder="제목을 입력하세요."
                    style={{ width: "970px", height: "50px" }}
                    onChange={(e) => {
                      handleTitle(e.target.value);
                    }}
                  />
                </Form.Group>

              </Row>
            </div>

<hr style={{opacity:'0%'}}/>

            <div>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridPlace">
                  <h3>장소</h3>
                  <Form.Control
                    id="mk_ticket_place"
                    type="text"
                    placeholder="공연 장소를 입력하세요."
                    style={{ width: "475px", height: "50px" }}
                    onChange={(e) => {
                      handleTicketPlace(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDate">
                  <h3>공연일</h3>
                  <Form.Control
                    id="mk_ticket_date"
                    type="date"
                    className="form-control"
                    style={{ width: "475px", height: "50px" }}
                    onChange={(e) => {
                      handleTicketDate(e.target.value);
                    }}
                  />
                </Form.Group>
  </Row>
</div>
<hr style={{opacity:'0%'}}/>

<div>
   <Row className="mb-5">

                <Form.Group as={Col} controlId="formGridTicketSeat">
                  <h3>좌석정보</h3>
                  <Form.Control
                    id="mk_ticket_seat"
                    type="text"
                    placeholder="좌석 정보를 입력하세요."
                    style={{ width: "250px", height: "50px" }}
                    onChange={(e) => {
                      handleTicketSeat(e.target.value);
                    }}
                  />
                </Form.Group>

        <Form.Group as={Col} controlId="formGridTicketCount">
          <h3>판매수량</h3>
          <Form.Control id="mk_ticket_count" type="number" min="1" placeholder="티켓의 수량을 입력하세요." style={{width:'250px' , height:'50px'}} onChange={(e)=>{handleTicketCount(e.target.value)}}/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridPrice" >
          <h3>판매등록가</h3>
          <Form.Control id="mk_ticket_price" type="text" placeholder="티켓의 판매 가격을 입력하세요." style={{width:'400px' , height:'50px'}} onChange={(e)=>{handleTicketPrice(e.target.value)}}/>
        </Form.Group>

        </Row>
      </div>
           <hr style={{opacity:'0%'}}/>

            <h3>상세내용</h3>
            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <QuillEditor
              value={board_mk_content}
              handleContent={handleContent}
              quillRef={quillRef}
              files={files}
              handleFiles={handleFiles}
              onChange={(e) => {
                handleContent(e.target.value);
              }}
            />
            <MarketFileInsert files={files} />
            <hr style={{ opacity: "0%" }} />
            <Button
              onClick={() => {
                boardUpdate();
              }}
            >
              글 수정하기
            </Button>
          </FormDiv>
        </ContainerDiv>
      </div>
    
    </>
  )
}

export default MarketUpdatePage
