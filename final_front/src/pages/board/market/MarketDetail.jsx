  import React, {  useEffect, useState } from 'react'
  import { Button, Tab, Tabs } from 'react-bootstrap';
  import { Cookies } from 'react-cookie';
  import { useNavigate} from 'react-router-dom';
  import {  mk_boardDetailDB, mk_boardSellDB, mk_minusLikesDB, mk_plusLikesDB } from '../../../axios/board/market/marketLogic';
  import Header from '../../../components/Header';
  import Sidebar from '../../../components/Sidebar';
  import { ContainerDiv, HeaderDiv} from '../../../styles/formStyle';
  import MarketBoardHeader from './MarketBoardHeader';
  import '../../../App.css'
  import MarketPaymentGuide from './MarketPaymentGuide';
  import MapContainer from './Map/MapContainer';
  import UserProfile from '../../../components/UserProfile';
  import { searchById } from '../../../axios/member/member';
  import Swal from "sweetalert2";
  import { wishlistAddDB,  wishlistDetailDB, wishlistSelDelDB } from '../../../axios/payment/wishlistLogic';
  import Footer from '../../../components/Footer';
  import { createChatRoom } from '../../../axios/chat/chat';

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

    const [sellerinfo, setSellerinfo] = useState();

    const search = window.location.search;
    /* console.log(search); */
    const no = search.split('&').filter((item) => { return item.match('no') })[0]?.split('=')[1];
    /* console.log(no); */

    const [detail, setDetail] = useState({}); //게시글의 상세데이터
    const [wishlistDetail, setWishlistDetail] = useState({}) //게시글과 일치하는 위시리스트의 상세데이터
    const navigate = useNavigate();

  //게시글,위시리스트 상세데이터 가져오기
  useEffect(() => {
    const boardDetail = async () => {
      const board = {
        boardMkNo: no
      }
      const res = await mk_boardDetailDB(board).then((res) => {
        console.log(res.data);
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
          board_mk_status : jsonDoc[0].boardMkStatus,
          board_mk_likes : jsonDoc[0].boardMkLikes
        })
        if(jsonDoc[0].boardMkStatus === 1  && member_no !== jsonDoc[0].memberNo) { //판매된 후 게시글 조회자가 판매자가 아닐 경우
          Swal.fire({
            icon: 'warning',
            title: '이미 판매완료된 상품입니다.',
            confirmButtonText: '확인',
          }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 confirm 버튼을 눌렀다면
              navigate(-1)
            }
        });
        }else if(jsonDoc[0].boardMkStatus === 1 && member_no === jsonDoc[0].memberNo) { //판매된 후 게시글 조회자가 판매자일 경우 (완전판매처리)
        Swal.fire({
          icon:'info',
          title:'판매 완료!',
          text:`판매금액 : ${jsonDoc[0].mkTicketPrice * jsonDoc[0].mkTicketCount}원`,
          confirmButtonText: '확인',
        }).then(result => {
            if (result.isConfirmed) {
              const confirmSelled = async() => {
                const board =  {
                  boardMkNo : jsonDoc[0].boardMkNo,
                  mkTicketPrice : jsonDoc[0].mkTicketPrice
                }
                res = await mk_boardSellDB(board)
                console.log(res.data)
              }
              confirmSelled()
              navigate('/market')
            }
        })
        }
      searchById(jsonDoc[0].memberId).then(setSellerinfo); 
      });
    }

    const wlistDetail = async() => {
      const wData = {
        boardMkNo : no,
        memberNo : member_no
      }
      const res = await wishlistDetailDB(wData)
      console.log(res.data);
      const temp = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(temp)
      setWishlistDetail({
      wl_title : jsonDoc[0].wishlistTitle,
      wl_price : jsonDoc[0].wishlistPrice,
      wl_category : jsonDoc[0].wishlistCategory,
      wl_memno : jsonDoc[0].memberNo,
      wl_boardmkno : jsonDoc[0].boardMkNo
      })
    }
    boardDetail()
    wlistDetail()
  }, [])

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
    const boardDateTime = formatTimeDiff(Date.now() - new Date(detail.board_mk_date).getTime())

  //찜하기 기능
  const [isWishlistAdded, setIsWishlistAdded] = useState((member_no !== undefined && wishlistDetail.wl_memno !== undefined) ? (member_no === wishlistDetail.wl_memno) : false);
  const [heart, setHeart] = useState((member_no !== undefined && wishlistDetail.wl_memno !== undefined) ? (member_no === wishlistDetail.wl_memno) : false);

  useEffect(() => {
    console.log("게시글을 조회하는 회원번호 : " + member_no)
    console.log("해당 상품을 찜한 회원번호 : " + wishlistDetail.wl_memno)
    setIsWishlistAdded((member_no !== undefined && wishlistDetail.wl_memno !== undefined) ? (member_no === wishlistDetail.wl_memno) : false);
    setHeart((member_no !== undefined && wishlistDetail.wl_memno !== undefined) ? (member_no === wishlistDetail.wl_memno) : false)
  }, [wishlistDetail, member_no]);

  const handleClick = () => {
    if(member_no === undefined){
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
    if (!isWishlistAdded) {
      addWishlist();
    } else {
      deleteWishlist();
    }
  }

  const addWishlist = () => {
    if (member_no > 0 && member_no !== detail.member_no) {
    const addtoWishlist = async() =>{
      const wData = {
        wishlistId : 0,
        wishlistTitle : detail.board_mk_title,
        wishlistPrice : detail.mk_ticket_price,
        wishlistFileurl : detail.board_mk_fileurl,
        wishlistCategory : "market",
        wishlistStatus : 0,
        boardMkNo : detail.board_mk_no,
        memberNo : member_no,
      }
      const res = await wishlistAddDB(wData)
      console.log(res.data)
    }
    const mkplusLikes = async() => {  //게시글 찜 갯수 증가
      const board={
        boardMkNo : detail.board_mk_no,
      }
      const res = await mk_plusLikesDB(board)
      console.log(res.data);
    }
    addtoWishlist()
    mkplusLikes()
    Swal.fire({
      icon: 'success',
      title: '상품을 찜했습니다!',
      showCancelButton: true,
      confirmButtonText: '확인하러 가기',
      cancelButtonText: '닫기',
    }).then(result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        navigate("/cart")
      }
  });
    setIsWishlistAdded(true);
    setHeart(true)
    } else if (member_no === detail.member_no) {
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

  //찜하기 취소 시
  const deleteWishlist = () => {
    if (member_no > 0 && member_no !== detail.member_no) {
    const deltoWishlist = async() => {
      const wData = {
        boardMkNo: detail.board_mk_no,
        memberNo : member_no,
      }
      console.log(wData)
      const res = await wishlistSelDelDB(wData)
      console.log(res.data)
    } 
    const mkminusLikes = async() => {  //게시글 찜 갯수 감소
      const board={
        boardMkNo : detail.board_mk_no,
      }
      const res = await mk_minusLikesDB(board)
      console.log(res.data);
    }
    deltoWishlist()
    mkminusLikes()
    Swal.fire({
      icon: 'info',
      title: '찜하기를 취소하였습니다.',
    })
    setIsWishlistAdded(false);
    setHeart(false)
    } else if (member_no === detail.member_no) {
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
    const linkToChat = (myId,friendId) => {
      if (member_no > 0 && member_no !== detail.member_no) {
        /* 유저와 판매자를 채팅으로 연결해주기 */
      console.log(myId);
      console.log(friendId);
      const members = [myId, friendId]
      createChatRoom(members)
      navigate("/chat");
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
      if (member_no > 0 && member_no !== detail.member_no) {
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
                    <UserProfile _userData={sellerinfo} /> {detail.member_nickname}</div>
                  <div style={{ marginRight: '20px', opacity: '80%', marginTop: '15px' }}>
                    <span style={{ marginRight: "5px", color: 'black' }}>
                    {heart ? (<><i class="bi bi-heart-fill" style={{color:'red'}} /> {' '} </>) : (<><i class="bi bi-heart" /> {' '} </>)}<span style={{ color: 'black', opacity: '30%', margin: '3px' }}> | </span>
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
                    {" "}{ formattedTicketDate }
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
                <Button variant="outline-danger" size="lg" style={{ width: '180px' }} onClick={handleClick}>
                {isWishlistAdded ? (<><i class="bi bi-check2-square" /> {' '} 찜한 상품</>) : (<><i class="bi bi-heart" /> {' '} 찜하기</>)}
    </Button> 
                                <Button variant="outline-dark" size="lg" style={{ width: '180px' }}  onClick={(e) =>
                    linkToChat(member_id, detail.member_id)
                  }>
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
          <section style={{ maxWidth: '1400px', minHeight: '1000px', marginLeft: '280px', marginTop: '100px' }}>
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
  <div >
  <Footer/>
  </div>
        </div>
      </>
    );
  }

  export default MarketDetail


