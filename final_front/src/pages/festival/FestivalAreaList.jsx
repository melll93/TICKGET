import React, { useEffect, useState } from 'react'
import { areaFestivalListDB, thumbsupFestivalDB } from '../../axios/festival/festival';
import CommonPagination from '../../components/CommonPagination';

const FestivalAreaList = ({selectedNavbarValue}) => {
 const [festivals, setFestivals] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [festMArea, setFestArea] = useState(selectedNavbarValue);

  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  
  const currentFest = (festivals) => {
    let currentFest = 0;
    currentFest = festivals.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };

  useEffect(() => {
    async function areaList() {
      const data = await areaFestivalListDB(festMArea);
      setFestArea(selectedNavbarValue);
      setFestivals(data);
    }
    areaList();
  }, [festMArea, selectedNavbarValue]);

  const hitPlusOne=async (festMId)=>{
    await thumbsupFestivalDB(festMId);
  } 




  return (
    <>
      <div>
      {currentFest(festivals).map((festival, i) => {
        return (
          <div
          key={festival.festMId}
                className="card"
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
                  <div className="card-body"  style={{overflow:'hidden', height:'220px'}}>
                    <h5 className="card-title">제목 : {festival.festMName}</h5>
                    <p className="card-text">로케 : {festival.festMLoc}</p>
                    <p className="card-text">
                      {festival.festMStart} ~ {festival.festMEnd}
                    </p>
                    <p className="card-text"> festId: {festival.festMId} </p>
                    <p className="card-text">
                      festCategory: {festival.festMArea}
                    </p>
                  </div>      {/* card-body */}
                </a>
                <div className='thumbs-up' onClick={()=>{hitPlusOne(festival.festMId)}} style={{borderRadius:'5px', border:'1px solid lightgray', textAlign:'right', marginLeft:'83%', paddingRight:'7px', cursor:'pointer'}}>
                <i className="bi bi-hand-thumbs-up fs-4"></i>
                {festival.festMHit===null ? 0: festival.festMHit}
                </div>
              </div> 
            ); //안쪽리턴
          })}{" "}
        {/*  map*/}
      </div>
    
      <CommonPagination
          pagination={setPage}
          perPage={perPage}
          totalItems={festivals.length}
        />
    </>

  ); //리턴끝
}; //SeoulFestivalList끝
  


export default FestivalAreaList

