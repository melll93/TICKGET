/* global daum */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BButton, ContainerDiv, FormDiv, HeaderDiv, MyButton, MyH1, MyInput, MyLabel, MyLabelAb, PwEye, SignupForm, SubmitButton,
} from "../../../styles/formStyle";
import { mk_boardInsertDB } from "../../../axios/board/market/marketLogic";
import { Button, Col, FloatingLabel, Form, InputGroup, Row, } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import MarketFileInsert from "./MarketFileInsert";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import Footer from "../../../components/Footer";



/* CSS */
const DivUploadImg = styled.div`
display:flex;
width:300px;
height:350px;
overflow:hidden;
margin:10px auto;
`;

const Img = styled.img`
 width:100%;
 height:100%;
 object-fit:cover;
`


const cookies = new Cookies();

const MarketWriteForm = ({ mkImageUploader }) => {
  
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

  //회원 정보 꺼내오기
  const member_no = _userData.memberNo;
  const member_nickname = _userData.memberNickname;
  const member_id = _userData.memberId;
  console.log(member_no)
  console.log(member_nickname)
  console.log(member_id)


  console.log("글쓰기 페이지 호출");
  const navigate = useNavigate();

  
 // 현재 시간을 구한다.
 const now = new Date();
 // 현재 시간 이후의 최소 날짜를 구한다.
 const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;



  const [board_mk_title, setTitle] = useState(""); //사용자가 입력한 제목 담기
 const [mk_ticket_place, setTicketPlace] = useState(""); //판매할 티켓의 공연장소 
  const [mk_ticket_date, setTicketDate] = useState(""); //판매할 티켓의 공연일
  const [mk_ticket_seat, setTicketSeat] = useState(""); //판매할 티켓의 좌석정보
  const [mk_ticket_count, setTicketCount] = useState(""); //판매할 티켓의 수량
  const [mk_ticket_price, setTicketPrice] = useState(""); //사용자가 입력한 판매가격
  const [board_mk_content, setContent] = useState(""); //사용자가 입력한 내용 담기

  //filename 하나 fileurl 둘이니 객체로 선언할 것
  const [files, setFiles] = useState({ fileName: null, fileUrl: null })

  const [validated, setValidated] = useState(false); //필수입력 내용 관리







  //사용자가 입력한 값을 useState에 초기화 하기
  const handleTitle = useCallback((e) => {
    setTitle(e);
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


  const handleContent = useCallback((value) => {
    setContent(value);
  }, []);

  //이미지 파일 첨부
  const imageChange = async (event) => {
    const uploaded = await mkImageUploader.upload(event.target.files[0])
    setFiles({
      fileName: uploaded.public_id + "." + uploaded.format,
      fileUrl: uploaded.url
    })
    //imput의 이미지 객체 얻어오기
    const upload = document.querySelector("#dimg")
    //이미지를 집어넣을 곳의 부모태그
    const holder = document.querySelector("#uploadImg")
    const file = upload.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      if (img.width > 150) {
        img.width = 150
      }
      holder.innerHTML = "";
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false
  }


  //필수입력 확인 함수 호출
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      Swal.fire({
        title: "필수 항목을 모두 입력해야합니다.",
        icon: 'warning',
        showCancelButton: true,
      })
    } else {
      setValidated(true);
      boardInsert();
    }
  };

  //글쓰기 버튼 클릭시 등록
  const boardInsert = async () => {
    const board = {
      boardMkNo: 0, // 자동채번 시퀀스 사용
      boardMkTitle: board_mk_title,
      boardMkContent: board_mk_content,
      boardMkDate : new Date(),
      boardMkHit: 0,
      mkTicketPlace: mk_ticket_place,
      mkTicketDate: mk_ticket_date,
      mkTicketSeat: mk_ticket_seat,
      mkTicketCount: mk_ticket_count,
      mkTicketPrice: mk_ticket_price,
      boardMkFilename: files.fileName,
      boardMkFileurl: files.fileUrl,
      memberNickname: member_nickname,
      memberId : member_id,
      memberNo : member_no,
      boardMkStatus : 0
    };
    const res = await mk_boardInsertDB(board);
    console.log(res.data);
    setTimeout(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '게시글 등록 성공',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onBeforeOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    navigate("/market");
    },1500)
  };


 

  // 다음 주소 찾기
  const searchAddress = () => {
    new daum.Postcode({
      oncomplete: function(data) {
        let address = ''; 
        let buildingName = '';
        if (data.userSelectedType === 'R') { 
          address = data.roadAddress + " " + data.buildingName;//도로명
        } else { 
          address = data.jibunAddress;//지번
        }
        console.log(data);
        console.log(address);
        setTicketPlace(address) 
        document.getElementById("mk_ticket_place").value = address;
      }
    }).open();
  }

  const handleCancle = () => {
    navigate('/market')
  }


  



  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <ContainerDiv>
          <HeaderDiv style={{ display: "flex", justifyContent: "center" }}>
            <div className="form-floating mb-3">
              <h3 style={{fontFamily: "Nanum Gothic", fontWeight: "bold" , fontSize:"1.8rem"}}><i class="bi bi-pencil-square"></i>{" "}티켓 중고판매 게시글 등록</h3>
            </div>
          </HeaderDiv>


          <Form noValidate validated={validated}>
            <FormDiv style={{ width: "1000px" }}>
              <hr style={{ opacity: '0%' }} />
              <div>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formGridTitle">
                    <h3>제목</h3>
                    <Form.Control
                      required
                      id="board_mk_title"
                      type="text"
                      placeholder="상품 제목을 입력하세요."
                      style={{ width: "970px", height: "50px" }}
                      onChange={(e) => {
                        handleTitle(e.target.value);
                      }}
                      
                    />

                    <Form.Control.Feedback type="invalid">
                      상품 제목을 입력해주세요.
                    </Form.Control.Feedback>
                  </Form.Group>

                </Row>
              </div>

              <hr style={{ opacity: '0%' }} />

              <div>
                <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridPlace">
        <h3>공연 장소</h3>
        <Form.Control
          required
          id="mk_ticket_place"
          type="text"
          placeholder="공연 장소를 입력하세요."
          style={{ width: "475px", height: "50px" }}
          onClick={()=>{searchAddress()}}
        />
        <Form.Control.Feedback type="invalid">
          공연 장소를 입력해주세요.
        </Form.Control.Feedback>
      </Form.Group>
 
                  <Form.Group as={Col} controlId="formGridDate">
                    <h3>공연일</h3>
                    <Form.Control
                      required
                      id="mk_ticket_date"
                      type="datetime-local"
                      className="form-control"
                      style={{ width: "475px", height: "50px" }}
                      min={minDate}
                      /* value={minDate} */
                      onChange={(e) => {
                        const value = e.target.value;
                        const ticketDate = value ? value : null;
                        handleTicketDate(ticketDate);
                      }}></Form.Control>
      {/*               <Form.Control.Feedback type="invalid">
                      공연 날짜와 시간을 입력해주세요.
                    </Form.Control.Feedback> */}
                  </Form.Group>
                </Row>
              </div>
              <hr style={{ opacity: '0%' }} />

              <div>

                <Row className="mb-5">

                  <Form.Group as={Col} controlId="formGridTicketSeat">
                    <h3>좌석정보</h3>
                    <Form.Control
                      required
                      id="mk_ticket_seat"
                      type="text"
                      placeholder="좌석 정보를 입력하세요."
                      style={{ width: "270px", height: "50px" }}
                      onChange={(e) => {
                        handleTicketSeat(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      좌석 정보를 입력해주세요.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridTicketCount" style={{ marginRight: '30px' }}>
                    <h3>판매수량</h3>
                    <Form.Control required id="mk_ticket_count" type="number" min="1" placeholder="티켓의 수량을 입력하세요." style={{ width: '270px', height: '50px' }} onChange={(e) => { handleTicketCount(e.target.value) }} />
                    <Form.Control.Feedback type="invalid">
                      판매할 티켓의 수량을 선택해주세요.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrice" style={{ marginLeft: 'auto' }} >
                    <h3>판매등록가</h3>
                    <InputGroup>
                      <Form.Control required id="mk_ticket_price" type="text" placeholder="판매 가격(숫자만) 입력하세요." style={{ width: '250px', height: '50px' }} onChange={(e) => { handleTicketPrice(e.target.value) }} />
                      <InputGroup.Text>원</InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        티켓의 판매가를 입력해주세요.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                </Row>
              </div>
              <hr style={{ opacity: '0%' }} />

              <h3>상세내용</h3>
              <hr style={{ margin: "10px 0px 10px 0px" }} />
              <Form.Group className="mb-3" controlId="Form.ControlTextarea1">
                <Form.Control id="board_mk_content" as="textarea"  type="text" rows={3} style={{ height: '150px' }}
                  onChange={(e) => {
                    handleContent(e.target.value);
                  }} />
              </Form.Group>

              <Form.Group controlId="formFileMultiple" className="mb-3">
                <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imageChange} />
              </Form.Group>
              <DivUploadImg div id="uploadImg">
                <img src="http://via.placeholder.com/300X350" alt="미리보기" />
              </DivUploadImg>


              <hr style={{ opacity: "0%" }} />
              <div style={{textAlign:'center'}}>

              <Button style={
                {backgroundColor:"rgb(80,50,200)" 
                , border:'1px solid white'
                , fontWeight:'bold'
                , transition:'background-color 0.3s ease',
              }}
              onClick={handleSubmit}
              >
                글 등록하기
              </Button>
              <Button style={
                {backgroundColor:"rgb(170,180,190)" 
                , border:'1px solid white'
                , fontWeight:'bold'
                , transition:'background-color 0.3s ease',
              }}
              onClick={handleCancle}
              >
                취소/이전으로
              </Button>


                </div>
            </FormDiv>
          </Form>
        </ContainerDiv>
        <div style={{marginTop:'100px'}}>
<Footer/>
        </div>
      </div>
    </>
  );
};

export default MarketWriteForm;
