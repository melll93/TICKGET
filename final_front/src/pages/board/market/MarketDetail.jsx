import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, ListGroup, Tab, Tabs } from 'react-bootstrap';
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
import UserProfile from '../../../components/UserProfile';
import { searchById } from '../../../axios/member/member';
import Swal from "sweetalert2";


const cookies = new Cookies();

const MarketDetail = () => {

  //회원 정보
  const _userData = cookies.get("_userData");
  /*  console.log(_userData) */

  let member_nickname = '';
  let member_id = '';
  let member_no;
  if (_userData) {
    member_nickname = _userData.memberNickname;
    member_id = _userData.memberId;
    member_no = _userData.memberNo;

  }




  const search = window.location.search;
  /* console.log(search); */
  const no = search.split('&').filter((item) => { return item.match('no') })[0]?.split('=')[1];
  /* console.log(no); */

  const [boards, setBoards] = useState([])
  const [detail, setDetail] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardDetail = async () => {
    const board = {
      boardMkNo: no
    }
    //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList 호출 해야 함
    //boardListDB에서는 no를 결정지을 수가 없음
    const res = await mk_boardDetailDB(board).then((res) => {
      const temp = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(temp)

      setDetail({
        board_mk_no: jsonDoc[0].boardMkNo,
        board_mk_title: jsonDoc[0].boardMkTitle,
        board_mk_content: jsonDoc[0].boardMkContent,
        board_mk_date: jsonDoc[0].boardMkDate,
        board_mk_hit: jsonDoc[0].boardMkHit,
        member_nickname: jsonDoc[0].memberNickname,
        member_id: jsonDoc[0].memberId,
        member_no: jsonDoc[0].memberNo,
        mk_ticket_place: jsonDoc[0].mkTicketPlace,
        mk_ticket_date: jsonDoc[0].mkTicketDate,
        mk_ticket_count: jsonDoc[0].mkTicketCount,
        mk_ticket_seat: jsonDoc[0].mkTicketSeat,
        mk_ticket_price: jsonDoc[0].mkTicketPrice.toLocaleString(),
        board_mk_filename: jsonDoc[0].boardMkFilename,
        board_mk_fileurl: jsonDoc[0].boardMkFileurl,
        board_mk_wlcount : jsonDoc[0].boardMkWlcount
      })

      searchById(jsonDoc[0].memberId).then(setUserData);
    });
  }




  //연월일 날짜 시간 표기방법으로 변경코드
  const date = new Date(detail.mk_ticket_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedTicketDate = `${year}-${month}-${day} ${hours}시 ${minutes}분`;


  //현재 시간 - 게시글 작성 시간
  const now = new Date();
  const boardMkDateTime = new Date(detail.board_mk_date)
  const diffInMs = now - boardMkDateTime;


  //작성일 태그에 적용
  const formatTimeDiff = (diffInMs) => {
    const seconds = Math.floor(diffInMs / 1000)
    if (seconds < 60) {
      return `${seconds}초 전`;
    } else {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return `${minutes}분 전`;
      } else {
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
          return `${hours}시간 전`;
        } else {
          const days = Math.floor(hours / 24);
          if (days < 30) {
            return `${days}일 전`;
          } else {
            const months = Math.floor(days / 30);
            if (months < 12) {
              return `${months}개월 전`;
            } else {
              const years = Math.floor(months / 12);
              return `${years}년 전`;
            }
          }
        }
      }
    }
  }

  /* console.log(Date.now())
   console.log(new Date(detail.board_mk_date).getTime()) */
  const boardDateTime = formatTimeDiff(Date.now() - new Date(detail.board_mk_date).getTime())




  //찜하기 기능
  const addWishlist = () => {
    if (member_no > 0) {
      /* 구현중.. */
     const addtoWishlist = async() =>{
      const wData = {
        wishlistTitle : detail.board_mk_title,
        wishlistCategory : 'board_market',
        memberNo : member_no,
        boardMkNo : detail.board_mk_no
      }
      const res = await wishlistAddDB(wData)
      console.log(res.data)
     }


    } else if (member_no == detail.member_no) {
      Swal.fire({
        title: "내 게시글에서 이용할 수 없습니다.",
        icon: 'error'
      });

    } else {
      Swal.fire({
        title: "로그인 후 이용하실 수 있습니다.",
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  }

  //채팅으로 연결
  const linkToChat = () => {
    if (member_no > 0) {
      /* 유저와 판매자 채팅으로 연결해주기 */


    } else if (member_no === detail.member_no) {
      Swal.fire({
        title: "내 게시글에서 이용할 수 없습니다.",
        icon: 'error',
      })

    } else {
      Swal.fire({
        title: "로그인 후 이용하실 수 있습니다.",
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  }

  //구매 페이지 이동
  const linkToPayment = () => {
    if (member_no > 0 && member_no != detail.member_no) {
      navigate(`/payment/${no}`)


    } else if (member_no === detail.member_no) {
      Swal.fire({
        title: "내 게시글에서 이용할 수 없습니다.",
        icon: 'error',
      })

    } else {
      Swal.fire({
        title: "로그인 후 이용하실 수 있습니다.",
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  }
  const [_userdata, setUserData] = useState();

  //상세보기 데이터 가져오기
  useEffect(() => {
    boardDetail()
    // .then((res) => {
    // searchById(detail.member_id).then(setUserData);
    // })
    console.log(_userData);
  }, [])

  //게시글 작성자(판매자) 프로필 가져오기

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <ContainerDiv>
          <HeaderDiv>
          </HeaderDiv>

          <div className="mktopcontainer" style={{ display: "flex", justifyContent: "center", width: "80%", marginRight: '200px', margin: '0', maxWidth: '1200px' }}>
            <div className="imgdiv" style={{ width: "80%", marginLeft: "100px" }}>
              <img className="product_detail_img" src={detail.board_mk_fileurl} alt="상품사진" style={{ objectFit: 'cover', width: '80%' }} />
            </div>
            <div style={{ width: "100%" }}>
              <MarketBoardHeader detail={detail} no={no} />
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "17.5px" }}>
                <div style={{ fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "1.1rem" }}>
                  <UserProfile _userData={_userdata} /> {detail.member_nickname}</div>
                <div style={{ marginRight: '20px', opacity: '80%', marginTop: '15px' }}>
                  <span style={{ marginRight: "5px", color: 'black' }}>
                    <i class="bi bi-heart-fill"></i> {detail.board_mk_wlcount} <span style={{ color: 'black', opacity: '30%', margin: '3px' }}> | </span>
                  </span>
                  <span style={{ marginRight: "5px", color: 'black' }}>
                    <i class="bi bi-eye-fill"></i> {detail.board_mk_hit} <span style={{ color: 'black', opacity: '30%', margin: '3px' }}> | </span>
                  </span>
                  <span style={{ marginRight: "5px", color: 'black' }}>
                    <i class="bi bi-clock-fill"></i> {boardDateTime}
                  </span>
                </div>
              </div>


              <hr style={{ opacity: '0%', marginBottom: '40px' }} />
              <div style={{ fontSize: '1.1rem' }}>
                <p style={{ textAlign: 'left', paddingRight: '10px', marginTop: '25px', opacity: '90%' }}>
                  <span style={{ display: 'inline-block', width: '5rem', marginRight: '10px', color: 'black' }}>∙ 공연일</span>
                  {" "}{formattedTicketDate}
                </p>
                <p style={{ textAlign: 'left', paddingRight: '10px', marginTop: '25px', opacity: '90%' }}>
                  <span style={{ display: 'inline-block', width: '5rem', marginRight: '10px', color: 'black' }}>∙ 공연장소</span>
                  {" "}{detail.mk_ticket_place}
                </p>
                <p style={{ textAlign: 'left', paddingRight: '10px', marginTop: '25px', opacity: '90%' }}>
                  <span style={{ display: 'inline-block', width: '5rem', marginRight: '10px', color: 'black' }}>∙ 좌석정보</span>
                  {" "}{detail.mk_ticket_seat}
                </p>
                <p style={{ textAlign: 'left', paddingRight: '10px', marginTop: '25px', opacity: '90%' }}>
                  <span style={{ display: 'inline-block', width: '5rem', marginRight: '10px', color: 'black' }}>∙ 수량</span>
                  {" "}{detail.mk_ticket_count}장
                </p>
                <p style={{ textAlign: 'left', paddingRight: '10px', marginTop: '25px', opacity: '90%' }}>
                  <span style={{ display: 'inline-block', width: '5rem', marginRight: '10px', color: 'black' }}>∙ 거래방식</span>
                  {" "}PIN거래 <span style={{ color: 'black', opacity: '50%', fontSize: '0.8rem' }}>구매자에게 PIN번호 전달</span>
                  <br />
                  <span style={{ display: 'inline-block', marginLeft: '5.9rem', color: 'black', marginTop: '5px' }}>직거래
                    <span style={{ color: 'black', opacity: '50%', fontSize: '0.8rem', marginLeft: '1rem' }}>채팅 문의</span>
                  </span>
                </p>
              </div>



              <div className="mb-2" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '70px', }}>
                <Button variant="outline-dark" size="lg" style={{ width: '180px' }} onClick={addWishlist}>
                  <i class="bi bi-heart"></i>{" "}찜하기
                </Button>{' '}
                <Button variant="outline-danger" size="lg" style={{ width: '180px' }} onClick={linkToChat}>
                  <i class="bi bi-chat-left-dots"></i>{" "}채팅하기
                </Button>{' '}
                <Button variant="outline-primary" size="lg" style={{ width: '180px' }} onClick={linkToPayment}>
                  <i class="bi bi-wallet2" ></i>{" "}구매하기
                </Button>
              </div>

            </div>
          </div>


        </ContainerDiv>





        {/* 상세정보 탭 */}
        <section style={{ maxWidth: '1400px', minHeight: '1000px', marginLeft: '300px', marginTop: '100px' }}>
          <Tabs
            id="fill-tab-example"
            fill
            style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
            className="gray-tabs"
          >
            <Tab eventKey="content" title="상품 상세정보" >
              <div style={{ marginTop: '50px', marginLeft: '30px', fontSize: '1.2rem' }}>
                {detail.board_mk_content}
              </div>
            </Tab>
            <Tab eventKey="place" title="공연장소 찾아가는길" unselected={true} mountOnEnter={true}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100% - 140px)", marginTop: "50px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", marginRight: '40px' }}>
                  <p style={{ fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "1.8rem", marginBottom: "20px" }}>
                    <i class="bi bi-geo-alt-fill"></i>
                    {" "}
                    {detail.mk_ticket_place}
                  </p>
                  <div style={{ width: "40%", borderTop: "1px solid black", marginBottom: "10px", opacity: "15%" }} />
                </div>

                <MapContainer place={detail.mk_ticket_place} />

              </div>
            </Tab>
            <Tab eventKey="payinfo" title="상품 결제/수령 안내" unselected={true}>
              <div style={{ marginTop: '80px' }}>
                <MarketPaymentGuide />
              </div>
            </Tab>
          </Tabs>
        </section>


      </div>
    </>
  );
}

export default MarketDetail


