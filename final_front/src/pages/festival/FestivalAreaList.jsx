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

  const hitPlusOne = (festMId) => {
    thumbsupFestivalDB(festMId)
    .then(() => {
      const updatedFestivals = [...festivals];
      const festivalToUpdate = updatedFestivals.find(festival => festival.festMId === festMId);
      festivalToUpdate.festMHit += 1;
      setFestivals(updatedFestivals);
    })
    .catch((error) => {
      console.error("Error updating thumbs up count:", error);
    });
  };



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

