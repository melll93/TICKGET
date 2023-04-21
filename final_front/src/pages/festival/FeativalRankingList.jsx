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
    }, []);
      
    const currentFest = (festivalHitList) => {
      let currentFest = 0;
      currentFest = festivalHitList.slice(indexOfFirstPost, indexOfLastPost);
      return currentFest;
    };
    /* 페이지네이션 */
    

    /* 좋아요  */
    const hitPlusOne = async (hit) => {
      await thumbsupFestivalDB(hit);
      console.log("이전 festivalHitList: ", festivalHitList);
      setFestivalHitList([...currentFest]); 
      console.log("이후 ", festivalHitList);

    };

    
    
    
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
       <img src={festival.festMImg} style={{width:"100%", overflow:'hidden', height:'400px'}} alt="사진1" />
       <div className="card-body" style={{overflow:'hidden', height:'220px'}} >
         <h5 className="card-title">제목 : {festival.festMName}</h5>
         <p className="card-text">로케 : {festival.festMLoc}</p>
         <p className="card-text">
           {festival.festMStart} ~ {festival.festMEnd}
         </p>
     {/*     <p className="card-text"> festId: {festival.festMId} </p> */}
         <p className="card-text">
           festCategory: {festival.festMGenre}
         </p>
       </div>
     </a>
     <div className='thumbs-up' onClick={()=>{hitPlusOne(festival.festMHit)}} style={{borderRadius:'5px', border:'1px solid lightgray', textAlign:'right', marginLeft:'83%', paddingRight:'7px', cursor:'pointer'}}>
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
