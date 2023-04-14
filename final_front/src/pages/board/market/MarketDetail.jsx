import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mk_boardDetailDB, mk_boardListDB } from '../../../axios/board/market/marketLogic';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { ContainerDiv, FormDiv, HeaderDiv, QnACommentArea } from '../../../styles/formStyle';
import MarketBoardFileDetail from './MarketBoardFileDetail';
import MarketBoardHeader from './MarketBoardHeader';


const MarketDetail = () => {


  const search = window.location.search;
  console.log(search);
  const page = search.split('&').filter((item) => { return item.match('page') })[0]?.split('=')[1];
  console.log(page);
  const no = search.split('&').filter((item) => { return item.match('no') })[0]?.split('=')[1];
  console.log(no);


  const [detail, setDetail] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  
  const formattedDate = `${year}-${month}-${day} ${hours}시 ${minutes}분`;
  console.log(formattedDate); // "2023-04-14 00:00"




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
            <h3 style={{ marginLeft: "10px" }}>마켓 게시글</h3>
          </HeaderDiv>
          <FormDiv>
            <MarketBoardHeader detail={detail} no={no} />

            <div className="topcontainer" >


              <div className="product_detail_imgdiv" >
                <img className="product_detail_img" src={detail.board_mk_fileurl} alt="상품사진"
                  style={{ objectFit: 'cover' }} />
              </div>


              <div className="product_detail_info" style={{ marginLeft: '120px' }}>
                <div className="product_detail">
                  <h3 className="product_title">상품 정보</h3>
                </div>
                <ListGroup variant="flush" style={{ width: '300px' }}>
                  <ListGroup.Item style={{ textAlign: 'center' }}>{detail.board_mk_title}</ListGroup.Item>
                  <ListGroup.Item style={{ textAlign: 'center' }}>{detail.mk_ticket_place}</ListGroup.Item>  {/* 장소 */}
                  <ListGroup.Item style={{ textAlign: 'center' }}>{formattedDate}</ListGroup.Item>   {/* 공연일 */}  
                  <ListGroup.Item style={{ textAlign: 'center' }}>{detail.mk_ticket_seat}</ListGroup.Item>   {/* 좌석정보 */}
                  <ListGroup.Item style={{ textAlign: 'center' }}></ListGroup.Item>
                </ListGroup>
                <hr style={{ opacity: '0%' }} />
                <div className="product_detail_payments" >
                  <h3 className="product_title">구매</h3>
                </div>
                <ListGroup variant="flush" style={{ width: '300px' }}>
                  <h4 style={{ textAlign: 'center' }}>{detail.mk_ticket_count}장</h4>
                  <ListGroup.Item></ListGroup.Item>
                  <h2 style={{ textAlign: 'center', marginTop: '15px' }}>{detail.mk_ticket_price} 원</h2>
                  <ListGroup.Item></ListGroup.Item>

                  <hr style={{ opacity: '0' }} />
                  <span><Button style={{ width: '145px' }}>채팅하기</Button>  <Button style={{ width: '145px' }} onClick={linkToPayment}>구매하기</Button></span>
                  <ListGroup.Item></ListGroup.Item>

                </ListGroup>

                <div>
                </div>
              </div>




            </div>





            {/* 
            <section style={{minHeight: '500px'}}>
<section style={{marginLeft:'-200px' , width:'1000px'}}>
<div className="midContainerCalendarAndRestSeats">
<div className='datail_imgdiv'>
  <img className="detail_img" src={'../images_key/fev1.png'} />
  </div>
  <br/>
<ListGroup variant="flush">
      <ListGroup.Item >상품정보 : {detail.board_mk_title}</ListGroup.Item>
      <ListGroup.Item >장소 : {detail.mk_ticket_place}</ListGroup.Item>
      <ListGroup.Item>공연일 : {detail.mk_ticket_date}</ListGroup.Item>
      <ListGroup.Item>좌석정보 : {detail.mk_ticket_seat}</ListGroup.Item>
      <ListGroup.Item></ListGroup.Item>
    </ListGroup>
</div>
</section>
            </section> */}


            <hr style={{ height: "2px" }} />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3>상세 내용&nbsp;</h3>
              </div>
              <div dangerouslySetInnerHTML={{ __html: detail.board_mk_content }} style={{ height: '250px' }}></div>
              {/*    <MarketBoardFileDetail files={files} /> */}
            </div>
          </FormDiv>
        </ContainerDiv>
      </div>
    </>
  );
}

export default MarketDetail
