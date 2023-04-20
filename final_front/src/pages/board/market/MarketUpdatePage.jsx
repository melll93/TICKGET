  import React, { useCallback, useEffect, useRef, useState } from 'react'
  import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
  import { useNavigate, useParams } from 'react-router-dom'
  import styled from 'styled-components'
  import { mk_boardDetailDB, mk_boardUpdateDB } from '../../../axios/board/market/marketLogic'
  import Header from '../../../components/Header'
  import Sidebar from '../../../components/Sidebar'
  import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/formStyle'
  import MarketFileInsert from './MarketFileInsert'
  import QuillEditor from './QuillEditor'
  import { Cookies } from 'react-cookie'
  import Swal from "sweetalert2";

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

  const MarketUpdatePage = ({mkImageUploader}) => {
    const navigate = useNavigate()
    
  //회원 정보
    const _userData = cookies.get("_userData"); 
    console.log(_userData)


    const {no} = useParams() //보드헤더에서 해시값 가져옴
    console.log(no)


    const [board_mk_title, setTitle] = useState(""); //사용자가 입력한 제목 담기
    const [mk_ticket_place, setTicketPlace] = useState(""); //판매할 티켓의 공연장소
    const [mk_ticket_date, setTicketDate] = useState(""); //판매할 티켓의 공연일
    const [mk_ticket_seat, setTicketSeat] = useState(""); //판매할 티켓의 좌석정보
    const [mk_ticket_count, setTicketCount] = useState(); //판매할 티켓의 수량
    const [mk_ticket_price, setTicketPrice] = useState(""); //사용자가 입력한 판매가격
    const [board_mk_content, setContent] = useState(""); //사용자가 입력한 내용 담기
    //QuillEditor이미지 선택하면 imageUploadDB타면 스프링플젝 pds 이미지 업로드
    //pds에 업로드된 파일을 읽어서 Editor안에 보여줌 imageGet?imageName=woman1.png
    const [files, setFiles] = useState({fileName:null, fileUrl:null})
    const quillRef = useRef();

    const [validated, setValidated] = useState(false);//필수입력 내용 관리훅



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
      setTicketPrice(jsonDoc[0].mkTicketPrice)
      setContent(jsonDoc[0].boardMkContent)
      setFiles({ fileName: jsonDoc[0].boardMkFilename, fileUrl: jsonDoc[0].boardMkFileurl })

    }
    boardDetail()
    },[no])
    



  
    //사용자가 입력한 값을 useState에 초기화 하기
    const handleTitle = useCallback((value) => {
      setTitle(value);
    }, []);
  
  
    const handleTicketPlace = useCallback((value) => {
      setTicketPlace(value);
    }, []);
  
    const handleTicketDate = useCallback((value) => {
      setTicketDate(value);
    }, []);
  
    const handleTicketSeat = useCallback((value) => {
      setTicketSeat(value);
    }, []);
  
    const handleTicketCount = useCallback((value) => {
      setTicketCount(value);
    }, []);
  
    const handleTicketPrice = useCallback((value) => {
      setTicketPrice(value);
    }, []);
  
    const handleContent = useCallback((value) => {
      setContent(value);
    }, []);


    //이미지 파일 첨부
    const imageChange =async(event)=>{
      const uploaded = await mkImageUploader.upload(event.target.files[0])
      setFiles({
        fileName:uploaded.public_id+"."+uploaded.format,
        fileUrl:uploaded.url
      })
      //imput의 이미지 객체 얻어오기
      const upload = document.querySelector("#dimg")
      //이미지를 집어넣을 곳의 부모태그
      const holder = document.querySelector("#uploadImg")
      const file = upload.files[0]
      const reader = new FileReader()
      reader.onload =(event)=>{
        const img = new Image()
        img.src=event.target.result
        if(img.width>150){
              img.width=150
        }
        holder.innerHTML="";
        holder.appendChild(img)
      }
      reader.readAsDataURL(file)
      return false
    }
    
    

    //필수입력 확인 함수 호출
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        setValidated(true);
  
        setTimeout(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '게시글 수정 성공',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            onBeforeOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          setTimeout(() => {
            boardUpdate();
          }, 1500); // 1초 대기 후 boardUpdate() 호출
        }, 1500); // 1초 대기 후 Swal.fire() 호출
      }
    };


    
    const boardUpdate = async() => {
    const board = {
      boardMkNo : no,
      boardMkTitle : board_mk_title,
      boardMkDate : new Date(),
      boardMkContent: board_mk_content,
      mkTicketPlace: mk_ticket_place,
      mkTicketDate: mk_ticket_date,
      mkTicketSeat: mk_ticket_seat,
      mkTicketCount: mk_ticket_count,
      mkTicketPrice: mk_ticket_price,
      boardMkFilename : files.fileName,
      boardMkFileurl : files.fileUrl
    }
    const res = await mk_boardUpdateDB(board)
    navigate(`/market/mk_boardDetail?no=${no}`)
    if(!res.data) return console.log('게시글 수정 실패')

    }


    

    return (
      <>
      
          <Header />
      <Sidebar />
        <div className="center">
          <ContainerDiv>
          <HeaderDiv style={{ display: "flex", justifyContent: "center" }}>
  <div className="form-floating mb-3" >
    <h3  style={{fontFamily: "Nanum Gothic", fontWeight: "bold" , fontSize:"1.8rem"}}>티켓 중고판매 게시글 수정</h3>
  </div>
</HeaderDiv>
    
      <Form noValidate validated={validated}>
            <FormDiv style={{ width: "1000px" }}>
              <hr style={{opacity:'0%'}}/>
              <div>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formGridTitle">
                    <h3>제목</h3>
                    <Form.Control
                    required
                      id="board_mk_title"
                      type="text"
                      value={board_mk_title}
                      style={{ width: "970px", height: "50px" }}
                      onChange={(e) => {
                        handleTitle(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
              제목을 입력해주세요.
            </Form.Control.Feedback>
                  </Form.Group>

                </Row>
              </div>

  <hr style={{opacity:'0%'}}/>

              <div>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formGridPlace">
                    <h3>공연 장소</h3>
                    <Form.Control
                    required
                      id="mk_ticket_place"
                      type="text"
                      value={mk_ticket_place}
                      style={{ width: "475px", height: "50px" }}
                      onChange={(e) => {
                        handleTicketPlace(e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleTicketDate(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
              공연 날짜와 시간을 입력해주세요.
            </Form.Control.Feedback>
                  </Form.Group>
    </Row>
  </div>
  <hr style={{opacity:'0%'}}/>

  <div>
    <Row className="mb-5">

                  <Form.Group as={Col} controlId="formGridTicketSeat">
                    <h3>좌석정보</h3>
                    <Form.Control
                    required
                      id="mk_ticket_seat"
                      type="text"
                      value={mk_ticket_seat}
                      style={{ width: "250px", height: "50px" }}
                      onChange={(e) => {
                        handleTicketSeat(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
              좌석 정보를 입력해주세요.
            </Form.Control.Feedback>
                  </Form.Group>

          <Form.Group as={Col} controlId="formGridTicketCount">
            <h3>판매수량</h3>
            <Form.Control required id="mk_ticket_count" type="number" min="1" value={mk_ticket_count}  style={{width:'250px' , height:'50px'}} onChange={(e)=>{handleTicketCount(e.target.value)}}/>
            <Form.Control.Feedback type="invalid">
              판매할 티켓의 수량을 선택해주세요.
            </Form.Control.Feedback>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridPrice" style={{marginLeft:'auto' }} >
            <h3>판매등록가</h3>
            <InputGroup>
            <Form.Control required id="mk_ticket_price" type="text" value={mk_ticket_price} style={{width:'250px' , height:'50px'}}
          onChange={(e)=>{handleTicketPrice(e.target.value)}}/>
            <InputGroup.Text>원</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              티켓의 판매가를 입력해주세요.
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          </Row>
        </div>
            <hr style={{opacity:'0%'}}/>

              <h3>상세내용</h3>
              <hr style={{ margin: "10px 0px 10px 0px" }} />

        <Form.Group controlId="formFileMultiple" className="mb-3">
    <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imageChange}/>
  </Form.Group>
        <DivUploadImg div id="uploadImg">
                    <img src={files.fileUrl}   alt="미리보기" />
              </DivUploadImg>


              <hr style={{ opacity: "0%" }} />
              <Button style={
                {backgroundColor:"rgb(80,50,200)" 
                , border:'1px solid white'
                , fontWeight:'bold'
                , transition:'background-color 0.3s ease',
              }}
                onClick={
                  handleSubmit
                }
              >
                글 수정하기
              </Button>
            </FormDiv>
            </Form>
          </ContainerDiv>
        </div>
      </>
    );
  };

  export default MarketUpdatePage
