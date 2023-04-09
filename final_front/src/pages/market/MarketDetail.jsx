  import React, { useEffect, useState } from 'react'
  import { Button, ListGroup } from 'react-bootstrap';
  import { useDispatch } from 'react-redux';
  import { useNavigate, useParams } from 'react-router-dom';
  import styled from 'styled-components';
  import { mk_boardDetailDB, mk_boardListDB } from '../../axios/market/marketLogic';
  import Header from '../../components/Header';
  import Sidebar from '../../components/Sidebar';
  import { ContainerDiv, FormDiv, HeaderDiv, QnACommentArea } from '../../styles/formStyle';
  import MarketBoardFileDetail from './MarketBoardFileDetail';
  import MarketBoardHeader from './MarketBoardHeader';

  const MarketDetail = () => {
    const search = window.location.search;
    console.log(search);
    const page = search.split('&').filter((item)=>{return item.match('page')})[0]?.split('=')[1];
    console.log(page);
    const no = search.split('&').filter((item)=>{return item.match('no')})[0]?.split('=')[1];
    console.log(no); 


    const [detail, setDetail] = useState({});
    const [files, setFiles]= useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const boardDetail = async() => {
        const board = {
          boardMkNo : no
        }
        //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList 호출 해야 함
        //boardListDB에서는 no를 결정지을 수가 없음
        const res = await mk_boardDetailDB(board);
        console.log(res.data);//빈배열만 출력됨
        const temp = JSON.stringify(res.data)
        const jsonDoc = JSON.parse(temp)
        console.log(jsonDoc[0]) //qna - 1row
        console.log(jsonDoc[1]) //1.png
        console.log(jsonDoc[2]) //2.png
        console.log(jsonDoc[3]) //3.png
      //이미지처리
        
        console.log(jsonDoc[0].memName);
        console.log(jsonDoc[0].boardMkTitle);
        console.log(jsonDoc[0].boardMkDate);
        console.log(jsonDoc[0].mkTicketPlace);
        console.log(jsonDoc[0].mkTicketSeat);
        console.log(jsonDoc[0].mKTicketCount);
        console.log(jsonDoc[0].boardMkFilename);
        console.log(jsonDoc[0].boardMkFileurl);


  /*       //이미지 파일을 담을 배열 선언
        const list = []
        if(jsonDoc.length>1){
          for(let i=1; i<jsonDoc.length; i++){
            const obj = {
              FILE_NAME:jsonDoc[i].FILE_NAME
            }
            list.push(obj)
          }
        }
        setFiles(list) */
        
  setDetail ({
    board_mk_no : jsonDoc[0].boardMkNo,
    board_mk_title : jsonDoc[0].boardMkTitle,
    board_mk_content : jsonDoc[0].boardMkContent,
    board_mk_date : jsonDoc[0].boardMkDate,
    board_mk_hit : jsonDoc[0].boardMkHit,
    mem_name : jsonDoc[0].memName,
    mk_ticket_place : jsonDoc[0].mkTicketPlace,
    mk_ticket_date : jsonDoc[0].mkTicketDate,
    mk_ticket_count : jsonDoc[0].mkTicketCount,
    mk_ticket_seat : jsonDoc[0].mkTicketSeat,
    mk_ticket_price : jsonDoc[0].mkTicketPrice, 
    board_mk_filename : jsonDoc[0].boardMkFilename, 
    board_mk_fileurl : jsonDoc[0].boardMkFileurl, 
  })
  }
  boardDetail()
    },[setDetail,no,dispatch,navigate])

    

    return (
      <>
      <Sidebar />
      <div className="center">
        <Header/>
        <ContainerDiv>
          <HeaderDiv>
            <h3 style={{marginLeft:"10px"}}>마켓 게시글</h3>
          </HeaderDiv>
          <FormDiv>
            <MarketBoardHeader detail={detail} no={no}/>

            <div className="topcontainer" >


                               <div className="product_detail_imgdiv">
                                         <img className="product_detail_img" src={detail.board_mk_fileurl}  alt="상품사진" />
                               </div>


                               <div className="product_detail_info">
                               <div className="product_detail_head">
                                <h3 className="product_title">상품 정보</h3>
                                </div>
                                <ListGroup variant="flush" style={{width:'300px'}}>
      <ListGroup.Item>{detail.board_mk_title}</ListGroup.Item>
      <ListGroup.Item >장소 : {detail.mk_ticket_place}</ListGroup.Item>
      <ListGroup.Item>공연일 : {detail.mk_ticket_date}</ListGroup.Item>
      <ListGroup.Item>좌석정보 : {detail.mk_ticket_seat}</ListGroup.Item>
      <ListGroup.Item></ListGroup.Item>
    </ListGroup>
                                  <hr style={{opacity:'0%'}}/>
                                <div className="product_detail_payments" >
                                <h3 className="product_title">결제</h3>
                                  </div>
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

          
            <hr style={{height:"2px"}}/>
            <div>
              <div style={{display:"flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <h3>상세 정보&nbsp;</h3>
              </div>
                <div dangerouslySetInnerHTML={{__html:detail.board_mk_content}} style={{height:'250px'}}></div>
                <MarketBoardFileDetail files={files} />
            </div>
          </FormDiv>
        </ContainerDiv>
        </div>
      </>
    );
  }

  export default MarketDetail
