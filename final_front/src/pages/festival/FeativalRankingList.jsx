import React, { useEffect, useState } from "react";
import {
  festivalHitListDB, thumbsupFestivalDB,
} from "../../axios/festival/festival";
import CommonPagination from "../../components/CommonPagination";
import { Card } from "react-bootstrap";

///////////////////////////////      페스티발 지역별   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const FestivalRankingList = () => {
  const [festivalHitList, setFestivalHitList] = useState([]);
  
  /* 페이지네이션 */
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
    useEffect(() => {
      const festivalHitList = async () => {
        const festMHit = true; // festHit 변수에 true 값을 할당하여 HIT가 높은 순으로 데이터를 가져옴
        const result = await festivalHitListDB(festMHit); 
        setFestivalHitList(result);
      };
      festivalHitList(); // 데이터 가져오기
      console.log(festivalHitList);
    }, [festivalHitList]);
      
    const currentFest = (festivalHitList) => {
      let currentFest = 0;
      currentFest = festivalHitList.slice(indexOfFirstPost, indexOfLastPost);
      return currentFest;
    };
    /* 페이지네이션 */
    

    /* 좋아요  */
    const hitPlusOne=async (festMHit)=>{
      await thumbsupFestivalDB(festMHit);
    } 

    
    
    
    return (
  <>

  {currentFest(festivalHitList).map((festival, i) => (
     
    
     <div
     key={festival.festMId}
     className="card "
     style={{
      width: "18rem", 
       display: "inline-block",
       margin: "50px 0px 0px 50px",
     }}
   >
     <a
       style={{ textDecoration: "none", color: "black" }}
       href={"/productsDetail/" + festival.festMId}
     >
  <img src={festival.festMImg} style={{width:"100%", overflow:'hidden', height:'380px'}} alt="사진1" />
       <div className="card-body" style={{overflow:'hidden', height:'150px'}} >
       <div style={{height:'30px', overflow:'hidden', padding:'5px', marginBottom:'15px'}}>
                    <h5 className="card-title"><strong>{festival.festMName}</strong></h5>
                    </div>
                    <p className="card-text">장소 : {festival.festMLoc}</p>
                    <p className="card-text">
                     기간: {festival.festMStart} ~ {festival.festMEnd}
                    </p>
       </div>
     </a>
     <div className='thumbs-up' onClick={()=>{hitPlusOne(festival.festMId)}} style={{borderRadius:'5px', border:'1px solid lightgray', textAlign:'center', marginLeft:'0%', paddingRight:'7px', cursor:'pointer'}}>
                <i className="bi bi-hand-thumbs-up fs-4"></i>
                {festival.festMHit===null ? 0: festival.festMHit}
                </div>
   </div>
    ))}
 
 <CommonPagination
          pagination={setPage}
          perPage={perPage}
          totalItems={festivalHitList.length}
        />
  </>
    );
  };
  

export default FestivalRankingList;
