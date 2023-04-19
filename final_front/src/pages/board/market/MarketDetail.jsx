import React, { useEffect, useState } from 'react'
import { Button, Card, ListGroup, Tab, Tabs } from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mk_boardDetailDB, mk_boardListDB } from '../../../axios/board/market/marketLogic';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { ContainerDiv, FormDiv, HeaderDiv, QnACommentArea } from '../../../styles/formStyle';
import MarketBoardFileDetail from './MarketBoardFileDetail';
import MarketBoardHeader from './MarketBoardHeader';
import '../../../App.css'
import MarketPaymentGuide from './MarketPaymentGuide';
import MapContainer from './Map/MapContainer';



const cookies = new Cookies();
 
const MarketDetail = () => {
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)


  const search = window.location.search;
  console.log(search);
  const page = search.split('&').filter((item) => { return item.match('page') })[0]?.split('=')[1];
  console.log(page);
  const no = search.split('&').filter((item) => { return item.match('no') })[0]?.split('=')[1];
  console.log(no);

  const [boards, setBoards] = useState([])
  const [detail, setDetail] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  //추천상품 목록 불러오기
  useEffect(() => {
  const recommendList = async() => {
    const res = await mk_boardListDB()
    setBoards(res.data);
  }
  recommendList()
  console.log(boards)
  },[])


  //상세보기 데이터 가져오기
  useEffect(() => {
    const boardDetail = async () => {
      const board = {
        boardMkNo: no
      }
      //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList 호출 해야 함
      //boardListDB에서는 no를 결정지을 수가 없음
      const res = await mk_boardDetailDB(board);
      console.log(res.data);//빈배열만 출력됨
      const temp = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(temp)
      console.log(jsonDoc[0].memName);
      /* console.log(jsonDoc[0].memNo); */
      console.log(jsonDoc[0].boardMkTitle);
      console.log(jsonDoc[0].boardMkDate);
      console.log(jsonDoc[0].mkTicketPlace);
      console.log(jsonDoc[0].mkTicketSeat);
      console.log(jsonDoc[0].mKTicketCount);
      console.log(jsonDoc[0].boardMkFilename);
      console.log(jsonDoc[0].boardMkFileurl);


      setDetail({
        board_mk_no: jsonDoc[0].boardMkNo,
        board_mk_title: jsonDoc[0].boardMkTitle,
        board_mk_content: jsonDoc[0].boardMkContent,
        board_mk_date: jsonDoc[0].boardMkDate,
        board_mk_hit: jsonDoc[0].boardMkHit,
        mem_name: jsonDoc[0].memName,
      /*   mem_no: jsonDoc[0].memNo, */
        mk_ticket_place: jsonDoc[0].mkTicketPlace,
        mk_ticket_date: jsonDoc[0].mkTicketDate,   
        mk_ticket_count: jsonDoc[0].mkTicketCount,
        mk_ticket_seat: jsonDoc[0].mkTicketSeat,
        mk_ticket_price: jsonDoc[0].mkTicketPrice.toLocaleString(),
        board_mk_filename: jsonDoc[0].boardMkFilename,
        board_mk_fileurl: jsonDoc[0].boardMkFileurl,
      })

    }
    boardDetail()
  }, [setDetail, no, dispatch, navigate])


  //연월일 날짜 시간 표기방법으로 변경코드
  console.log(detail.mk_ticket_date) //2023-04-14T00:00:00
  const date = new Date(detail.mk_ticket_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  const formattedTicketDate = `${year}-${month}-${day} ${hours}시 ${minutes}분`;
  console.log(formattedTicketDate); // "2023-04-14 00:00"


    //현재 시간 - 게시글 작성 시간
    const now = new Date();
    const boardMkDateTime = new Date(detail.board_mk_date)
    const diffInMs = now - boardMkDateTime;
    console.log(diffInMs)
       
   
    //작성일 태그에 적용
      const formatTimeDiff = (diffInMs) =>{
        const seconds = Math.floor(diffInMs / 1000)
        if (seconds < 60) {
          console.log(`${seconds}초 전`);
          return `${seconds}초 전`;
        } else {
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) {
            console.log(`${minutes}분 전`);
            return `${minutes}분 전`;
          } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
              console.log(`${hours}시간 전`);
              return `${hours}시간 전`;
            } else {
              const days = Math.floor(hours / 24);
              if (days < 30) {
                console.log(`${days}일 전`);
                return `${days}일 전`;
              } else {
                const months = Math.floor(days / 30);
                if (months < 12) {
                  console.log(`${months}개월 전`);
                  return `${months}개월 전`;
                } else {
                  const years = Math.floor(months / 12);
                  console.log(`${years}년 전`);
                  return `${years}년 전`;
                }
              }
            }
          }
        }
      } 

     console.log(Date.now())
     console.log(new Date(detail.board_mk_date).getTime())
    const boardDateTime = formatTimeDiff(Date.now() - new Date(detail.board_mk_date).getTime())










  const linkToPayment = () => {
    navigate(`/payment/${no}`)
  }


  return (
<>
  <Header />
  <Sidebar />
  <div className="center">
    <ContainerDiv>
      <HeaderDiv>
      </HeaderDiv>

      <div className="mktopcontainer" style={{ display: "flex", justifyContent: "center", width: "80%" , marginRight:'200px' , margin:'0' , maxWidth:'1200px' }}>
        <div className="imgdiv" style={{ width: "80%" ,  marginLeft:"100px"}}>
          <img className="product_detail_img" src={detail.board_mk_fileurl} alt="상품사진" style={{ objectFit: 'cover', width: '80%' }} />
        </div>
        <div style={{ width: "100%" }}>
          <MarketBoardHeader detail={detail} no={no} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "16px" }}>
  <div>작성자프로필이미지 | 작성자명</div>
  <div style={{marginRight:'45px', opacity:'90%'}}>
    <span style={{ marginRight: "5px" , color:'black'}}>
      <i class="bi bi-heart-fill"></i> 5 <span style={{color:'black' , opacity:'30%' , margin:'3px'}}> | </span>
    </span>
    <span style={{ marginRight: "5px" , color:'black'}}>
      <i class="bi bi-eye-fill"></i> {detail.board_mk_hit} <span style={{color:'black' , opacity:'30%' , margin:'3px'}}> | </span>
    </span>
    <span style={{ marginRight: "5px" , color:'black'}}>
      <i class="bi bi-clock-fill"></i> {boardDateTime}
    </span>
  </div>
</div>
          
          
          <hr style={{opacity:'0%', marginBottom:'40px'}}/>
          <div style={{fontSize:'1.1rem'}}>
  <p style={{textAlign:'left', paddingRight:'10px'  ,marginTop:'25px' , opacity:'90%'}}>
    <span style={{display:'inline-block', width:'5rem' ,marginRight:'10px', color:'black'}}>∙ 공연일</span>
    {" "}{formattedTicketDate}
  </p>
  <p style={{textAlign:'left', paddingRight:'10px' ,marginTop:'25px' , opacity:'90%'}}>
    <span style={{display:'inline-block', width:'5rem',marginRight:'10px', color:'black'}}>∙ 공연장소</span>
    {" "}{detail.mk_ticket_place}
  </p>
  <p style={{textAlign:'left', paddingRight:'10px' ,marginTop:'25px' , opacity:'90%'}}>
    <span style={{display:'inline-block', width:'5rem',marginRight:'10px', color:'black'}}>∙ 좌석정보</span>
    {" "}{detail.mk_ticket_seat}
  </p>
  <p style={{textAlign:'left', paddingRight:'10px' ,marginTop:'25px' , opacity:'90%'}}>
    <span style={{display:'inline-block', width:'5rem',marginRight:'10px' ,color:'black'}}>∙ 수량</span>
    {" "}{detail.mk_ticket_count}장
  </p>
  <p style={{textAlign:'left', paddingRight:'10px' ,marginTop:'25px' , opacity:'90%'}}>
    <span style={{display:'inline-block', width:'5rem',marginRight:'10px', color:'black'}}>∙ 거래방식</span>
    {" "}PIN거래 <span style={{color:'black' , opacity:'50%' , fontSize:'0.8rem'}}>구매자에게 PIN번호 전달</span>
    <br/>
    <span style={{ display: 'inline-block', marginLeft: '5.9rem', color: 'black' ,marginTop:'5px'}}>직거래
    <span style={{color:'black' , opacity:'50%' , fontSize:'0.8rem' , marginLeft: '1rem'}}>채팅 문의</span>
    </span>
  </p>
</div>



<div className="mb-2" style={{display: 'flex', justifyContent: 'space-between', marginTop:'50px',}}>
        <Button variant="outline-dark" size="lg" style={{width:'180px'}}>
        <i class="bi bi-heart"></i>{" "}찜하기
        </Button>{' '}
        <Button variant="outline-danger" size="lg" style={{width:'180px'}}>
          <i class="bi bi-chat-left-dots"></i>{" "}채팅하기
        </Button>{' '}
        <Button variant="outline-primary" size="lg" style={{width:'180px'}} onClick={linkToPayment}>
        <i class="bi bi-wallet2" ></i>{" "}구매하기
        </Button>
      </div>
        </div>
      </div>


    </ContainerDiv>



{/* 연관상품 탭 작업 */}
{/* <section style={{marginTop:'50px'}}>
<div> 연관상품 </div>
<div className='row'>
<div>
{boards.slice(0, 5).map((boards) => (
  <div key={boards.boardMkNo} src={boards.boardMkFileurl} style={{width:'150px', height:'150px', marginRight:'20px'}} alt="Card image" />
  ))}
  </div>
  </div>

</section>
 */}

{/* 상세정보 탭 */}
    <section style={{maxWidth:'1400px', minHeight:'1000px' ,marginLeft:'300px' , marginTop:'100px'}}>
  <Tabs
    id="fill-tab-example"
    fill 
    style={{ fontFamily:"Nanum Gothic", fontWeight:"bold"  }}
    className="gray-tabs"
  >
    <Tab eventKey="content" title="상품 상세정보" >
      <div style={{marginTop:'30px' , marginLeft:'30px'}}>
        {detail.board_mk_content}
      </div>  
    </Tab>
    <Tab eventKey="place" title="공연장소 찾아가는길" unselected={true}>
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100% - 140px)", marginTop: "50px" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", marginRight:'40px' }}>
      <p style={{ fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "1.3rem", marginBottom: "20px" }}>
        <i class="bi bi-geo-alt-fill"></i>
        {" "}
        {detail.mk_ticket_place}
      </p>
      <div style={{ width: "40%", borderTop: "1px solid black", marginBottom: "10px", opacity: "15%" }} />
    </div>
    <MapContainer place={detail.mk_ticket_place} />
  </div>
</Tab>
    <Tab eventKey="payinfo" title="상품 결제/수령 안내"  unselected={true}>
      <div style={{marginTop:'80px'}}>
        <MarketPaymentGuide/>
      </div>
    </Tab>
  </Tabs>
</section>

  
  </div>
</>
  );
}

export default MarketDetail


