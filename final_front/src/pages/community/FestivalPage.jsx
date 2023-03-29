import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import data from "./data";
import { FestivalListLocationDB, FetivalListDB, KyeongkiFestivalListDB, SeoulFestivalListDB } from "../../axios/main/Festival";





const Navbar = ({changeModal, modal2open, modal2_1open, modal3open, modal4open}) => {
  const [ style, setStyle ] = useState({display: 'none'})
  const FestTotalModals=() => {
    changeModal()
  }
  const Seoul=() => {
    modal2open()
  }
  const Kyeongki=()=>{modal2_1open()}
  const modalch=()=>{
    modal3open()
  }
  const modal4=()=>{
    modal4open()
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={FestTotalModals}
                style={{ marginLeft: "150px" }}
              >
                전체
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ marginLeft: "150px" }}  onMouseEnter={e => {
                    setStyle({display: 'block'})
          }}
      onMouseLeave={e => {
                    setStyle({display: 'none'})
      }} >
                지역별
                <div style={style}>
                <li className="nav-item">
              <a className="nav-link" onClick={Seoul}>
              서울
              </a>
            </li>
                <li className="nav-item">
              <a className="nav-link" onClick={Kyeongki}>
              경기
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={Seoul}>
              강원도
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={Kyeongki}>
              경상도
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={Seoul}>
              전라도
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={Kyeongki}>
              제주도/광역시
              </a>
            </li>

     </div>  
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ marginLeft: "150px" }} onClick={modalch}>
                인기순/랭킹
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  style={{ marginLeft: "150px" }} onClick={modal4}>
                기타
              </a>
            </li>
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
    <div key={festival.festId} className="card" style={{ width: "18rem", display: "inline-block", margin: "50px 0px 0px 50px", }} >
    <a  style={{ textDecoration: "none", color: "black" }} href={"/productsDetail/" + festival.festId}>
      <img src={"images_key/fev" + (festival.festId) + ".PNG"} width="100%" alt="사진1" />
        서울 상품
      <div className="card-body">
        <h5 className="card-title">제목 : {festival.festTitle}</h5>  
        <p className="card-text">설명 : {festival.festDesc}</p>
        <p className="card-text">{festival.festStartday} ~ {festival.festEndday} </p>
        <p className="card-text"> 로케:{festival.festLocation}</p>
        <p className="card-text"> festId: {festival.festId} </p>
        <p className="card-text"> festcate:{festival.festCategory} </p>
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
    <div key={festival.festId} className="card" style={{ width: "18rem", display: "inline-block", margin: "50px 0px 0px 50px", }} >
    <a  style={{ textDecoration: "none", color: "black" }} href={"/productsDetail/" + festival.festId}>
      <img src={"images_key/fev" + (festival.festId) + ".PNG"} width="100%" alt="사진1" />
        경기 상품
      <div className="card-body">
        <h5 className="card-title">제목 : {festival.festTitle}</h5>  
        <p className="card-text">설명 : {festival.festDesc}</p>
        <p className="card-text">{festival.festStartday} ~ {festival.festEndday} </p>
        <p className="card-text"> 로케:{festival.festLocation}</p>
        <p className="card-text"> festId: {festival.festId} </p>
        <p className="card-text"> festcate:{festival.festCategory} </p>
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
          <p className="card-text">
          <br/> festId: 
          <br/> festCategory:
          </p>
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
            <p className="card-text">
            <br/> festId: 
            <br/> festCategory:
            </p>
          </div>
      </div>
      )
    }



const FestivalsTest =() =>{
  
    const [festivals, setFestivals] = useState([]);
    useEffect(() => {
      FetivalListDB().then(setFestivals);
    }, []);
  return(
  <>
   <div>
        {festivals.data && festivals.data.map((festival, i) => {
return(
      <div key={festival.festId}
      className="card"
      style={{
        width: "18rem",
        display: "inline-block",
        margin: "50px 0px 0px 50px",
      }}
    >
      <a
        style={{ textDecoration: "none", color: "black" }}
        href={"/productsDetail/" + festival.festId}
      >
        <img
          src={"images_key/fev" + (festival.festId) + ".PNG"}
          width="100%"
          alt="사진1"
        />
          등록한 상품
        <div className="card-body">
          <h5 className="card-title">제목 : {festival.festTitle}</h5>  
          <p className="card-text">설명 : {festival.festDesc}</p>
          <p className="card-text">
            {festival.festStartday} ~ {festival.festEndday}
          <br/> festId: {festival.festId}
          <br/> festCategory: {festival.festCategory}
          </p>
        </div>
      </a>
    </div>
) 
        })}
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
        <Header />
        Festival 페이지<br/>
        <Link to="/addProducts" style={{fontSize:'40px', backgroundColor:'blue', color:'white', borderRadius:'20%', textDecoration:'none'}}>상품등록버튼</Link>
        <Navbar changeModal={changeModal} modal2open={modal2open} modal2_1open={modal2_1open} modal3open={modal3open} modal4open={modal4open} />
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
