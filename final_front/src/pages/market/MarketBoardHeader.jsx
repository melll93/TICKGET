   import React from 'react'
   import { useNavigate } from 'react-router-dom';
import { mk_boardDeleteDB } from '../../axios/market/marketLogic';
   import { BButton } from '../../styles/formStyle';

   const MarketBoardHeader = ({detail, no}) => {
   console.log(detail);
   console.log(no);
   const navigate = useNavigate();
   

   const boardDelete = async() => {
   const board = {
      boardMkNo : no
   }
   const res = await mk_boardDeleteDB(board)
   console.log(res.data)
   alert('게시글 삭제 완료')
   navigate('/market')

   }


   const boardList = () => {
      navigate('/market')
   }





   return (
      <div>
         <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
         <div style={{display: 'flex', justifyContent:"space-between"}}>
            <div style={{overflow: "auto"}}>
               <span style={{marginLeft:'10px' , marginBottom:'12px', fontSize: "30px", display:"block"}}>
               {detail.board_mk_title}
               </span>
            </div>
            {
               <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/market/update/${no}`)}}>
                  수정
               </BButton>
               <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{boardDelete()}}>
                  삭제
               </BButton>
               <BButton style={{margin:'0px 10px 0px 10px'}} onClick={boardList}>
                  목록
               </BButton>
               </div>
            }
         </div>
         <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '16px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
               <span>▪ {detail.mem_name}</span> 
               <span>▪ {detail.board_mk_date} | 조회수 {detail.board_mk_hit}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px' , fontSize:'16px'}}>
{/*                <div style={{display: 'flex'}}>
               <span style={{marginLeft:'10px' }}>조회수 :</span>
               <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.board_mk_hit}</div>
               </div> */}
               <div style={{display: 'flex'}}>
               {detail.COMMENT?<>
                  <span style={{marginRight:'5px'}}>댓글수 :</span>
                  <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.COMMENT}</div>
               </>:<></>}
               </div>
            </div>
         </div>
         </div>
         <hr style={{height: '2px'}}/>
      </div>
   )
   }

   export default MarketBoardHeader;