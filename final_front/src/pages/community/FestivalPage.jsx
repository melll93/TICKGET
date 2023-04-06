/* 은영 수정중 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {FetivalListDB, KyeongkiFestivalListDB, SeoulFestivalListDB } from "../../axios/main/Festival";
import PaginationPrac from "../../components/PaginationPrac";





const Navbar = ({changeModal, modal2open, modal2_1open, modal3open, modal4open}) => {
  const [ style, setStyle ] = useState({display: 'none'})
  const FestTotalModals=() => {changeModal()}
  const Seoul=() => {  modal2open()}
  const Kyeongki=()=>{modal2_1open()}
  const modalch=()=>{modal3open()}
  const modal4=()=>{modal4open()}
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <ul className="nav-item">
              <li
                className="nav-link"
                onClick={FestTotalModals}
                style={{ marginLeft: "150px" }}
              >
                전체
              </li>
            </ul>
            <ul className="nav-item">
              <ul className="nav-link" style={{ marginLeft: "150px" }}  onMouseEnter={e => {
                    setStyle({display: 'block'})}} onMouseLeave={e => {setStyle({display: 'none'})}} >
                지역별
                <ul style={style}>

                {/* <div style={{display:'flex', backgroundColor:'darkblue'}}> */}

                <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}>
              서울
              </li>
            </ul>
                <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}>
              경기/인천
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}>
              충청/강원
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}>
              대구/경북
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}>
              부산/경남
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}>
              광주/전라
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}>
              제주
              </li>
            </ul>
            </ul>


              </ul>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" style={{ marginLeft: "150px" }} onClick={modalch}>
                인기순/랭킹
              </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link"  style={{ marginLeft: "150px" }} onClick={modal4}>
                기타
              </li>
            </ul>
          </ul>
        </div>
      </nav>
    </>
  );
};


///////////////////////////////      페스티발 지역별(서울)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const SeoulFestivalList=()=>{
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {SeoulFestivalListDB().then(setFestivals); }, []);
return(
<>
 <div>
 {festivals.data && festivals.data.map((festival, i) => {
return(
    <div key={festival.festMId} className="card" style={{ width: "18rem", display: "inline-block", margin: "50px 0px 0px 50px", }} >
    <a  style={{ textDecoration: "none", color: "black" }} href={"/productsDetail/" + festival.festId}>
      <img  src={festival.festMImg} width="100%" alt="사진1" />
        서울 상품
        <div className="card-body">
          <h5 className="card-title">제목 : {festival.festMName}</h5>  
          <p className="card-text">로케 : {festival.festMLoc}</p>
          <p className="card-text"> {festival.festMStart} ~ {festival.festMEnd} </p>
          <p className="card-text"> festId: {festival.festMId} </p>
          <p className="card-text"> festCategory: {festival.festMGenre} </p>
        </div>
    </a>
  </div>
)  //안쪽리턴
})} {/*  map*/}
</div>
</>
  ) //리턴끝
}  //SeoulFestivalList끝

///////////////////////////////      페스티발 지역별 (경기)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const KyeongkiFestivalList=()=>{
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {KyeongkiFestivalListDB().then(setFestivals); }, []);
return(
<>
 <div>
 {festivals.data && festivals.data.map((festival, i) => {
return(
    <div key={festival.festMId} className="card" style={{ width: "18rem", display: "inline-block", margin: "50px 0px 0px 50px", }} >
    <a  style={{ textDecoration: "none", color: "black" }} href={"/productsDetail/" + festival.festMId}>
      <img src={festival.festMImg} width="100%" alt="사진1" />
        경기 상품
        <div className="card-body">
          <h5 className="card-title">제목 : {festival.festMName}</h5>  
          <p className="card-text">로케 : {festival.festMLoc}</p>
          <p className="card-text"> {festival.festMStart} ~ {festival.festMEnd} </p>
          <p className="card-text"> festId: {festival.festMId} </p>
          <p className="card-text"> festCategory: {festival.festMGenre} </p>
        </div>
    </a>
  </div>
)  //안쪽리턴
})} {/*  map*/}
</div>
</>
  ) //리턴끝
}  //SeoulFestivalList끝



const FestivalRankingList=()=>{
  return(
      <div 
      className="card"
      style={{
        width: "18rem",
        display: "inline-block",
        margin: "50px 0px 0px 50px",
      }}
    >
          랭킹별 분류 상품
        <div className="card-body">
          <h5 className="card-title">제목 :</h5>  
          <p className="card-text">설명 : </p>
          <p className="card-text"> festId:  </p>
          <p className="card-text"> festCategory:  </p>
        </div>
    </div>
    )
  }
  const FestivalExtraList=()=>{
    return(
        <div 
        className="card"
        style={{
          width: "18rem",
          display: "inline-block",
          margin: "50px 0px 0px 50px",
        }}
      >
            기타 분류 상품
          <div className="card-body">
            <h5 className="card-title">제목 :</h5>  
            <p className="card-text">설명 : </p>
            <p className="card-text"> </p>
          </div>
      </div>
      )
    }

    
    
    const FestivalsTest =() =>{
      const [festivals, setFestivals] = useState([]);
      const [page, setPage] = useState(1);
      const [perPage] = useState(20)
    const [test, setTest] = useState(0);
    // console.log('랭스:'+festivals.length)
    // console.log('perPage: ' + perPage)
    useEffect(() => {
      FetivalListDB().then(setFestivals);
    }, []);
    const indexOfLastPost = page*perPage;
    const indexOfFirstPost=indexOfLastPost -perPage

const currentFest = (festivals)=>{
  let currentFest=0;
  currentFest=festivals.slice(indexOfFirstPost, indexOfLastPost)
return currentFest;
}



  return(
  <>
   <div>
        {currentFest(festivals) && currentFest(festivals).map((festival, i) => {
  // console.log(festival)
return(
      <div key={festival.festMId}
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
        <img
          src={festival.festMImg}
          width="100%"
          alt="사진1"
        />
        <div className="card-body">
          <h5 className="card-title">제목 : {festival.festMName}</h5>  
          <p className="card-text">로케 : {festival.festMLoc}</p>
          <p className="card-text"> {festival.festMStart} ~ {festival.festMEnd} </p>
          <p className="card-text"> festId: {festival.festMId} </p>
          <p className="card-text"> festCategory: {festival.festMGenre} </p>
        </div>
      </a>
    </div>
) 
        })}
      </div>
      <div style={{ textAlign: "center" }}>
          <PaginationPrac  currentFest={currentFest(festivals)} pagination={setPage} perPage={perPage} totalFest={festivals.length}/>
        </div>
  </>
    )
}  ///////////////////////////////////// FestivalsTest 끝////////////////////////////////////////










const FestivalPage = () => {
  let [totalFest, setTotalFest] = useState(1); //0이면 닫힘, 1이면 열림.
  const [modal2, setModal2]=useState(0);  //지역별(서울)
  const [modal2_1, setModal2_1]=useState(0);  //지역별(경기)
  const [modal3, setModal3]=useState(0); //인기순/랭킹
  const [modal4, setModal4]=useState(0);
  const changeModal=()=>{setTotalFest(1); setModal2(0); setModal2_1(0); setModal3(0); setModal4(0);}
  const modal2open=()=>{setTotalFest(0); setModal2(1); setModal2_1(0); setModal3(0); setModal4(0) }
  const modal2_1open=()=>{setTotalFest(0); setModal2(0); setModal2_1(1); setModal3(0); setModal4(0) }
  const modal3open=()=>{setTotalFest(0); setModal2(0);  setModal2_1(0); setModal3(1); setModal4(0) }
  const modal4open=()=>{setTotalFest(0); setModal2(0);  setModal2_1(0); setModal3(0); setModal4(1) }

  
  return (
    <>
      <Sidebar />
      <div className="center">
        Festival 페이지<br/>

        <Header />
        <Navbar changeModal={changeModal} modal2open={modal2open} modal2_1open={modal2_1open} modal3open={modal3open} modal4open={modal4open} />
        <Link to="/addProducts" style={{fontSize:'40px', backgroundColor:'blue', color:'white', borderRadius:'20%', textDecoration:'none'}}>상품등록버튼</Link>
        {totalFest===1?<FestivalsTest></FestivalsTest>:null}<br/>
        {modal2 === 1 ? <SeoulFestivalList /> : null}
        {modal2_1 === 1 ? <KyeongkiFestivalList /> : null}
        {modal3 === 1 ? <FestivalRankingList> </FestivalRankingList> : null}
        {modal4 === 1 ? <FestivalExtraList /> : null}
        </div>
    </>
)
}

export default FestivalPage;
