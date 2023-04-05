import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
       
      console.log(jsonDoc[0].boardMkTitle);
      console.log(jsonDoc[0].memName);
      console.log(jsonDoc[0].boardMkTitle);
      console.log(jsonDoc[0].boardMkDate);
      console.log(jsonDoc[0].mkTicketPlace);
      console.log(jsonDoc[0].mkTicketSeat);
      console.log(jsonDoc[0].mKTicketCount);


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
          <section style={{minHeight: '400px'}}>
            <div dangerouslySetInnerHTML={{__html:detail.board_mk_content}}></div> {/* //게시글 내용 */}
          </section>
          <MarketBoardFileDetail files={files} />
          <hr style={{height:"2px"}}/>
          <div>
            <div style={{display:"flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h2>답변 대기중&nbsp;</h2>
              <div style={{display:"flex"}}>
                <Button /* onClick={commentInsert} */>답변</Button>
                &nbsp;
                <Button /* onClick={commentUpdate} */>수정</Button>
              </div>
            </div>
              <QnACommentArea />
          </div>
        </FormDiv>
      </ContainerDiv>
      </div>
    </>
  );
}

export default MarketDetail
