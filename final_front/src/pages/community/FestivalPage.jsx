import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import data from "./data";
import { FetivalListDB } from "../../axios/main/Festival";

function ProductsItems(props) {
  return (
    <>
      <div
        className="card" style={{
          width: "18rem",
          display: "inline-block",
          margin: "50px 0px 0px 50px",
        }}
      >
        <a style={{ textDecoration: "none", color: "black" }} href={"/productsDetail/" + props.i}
        >
          <img
            src={"images_key/fev" + props.i + ".PNG"}
            width="100%"
            alt="사진1"
          />
          <div className="card-body" >
            <h5 className="card-title">{props.dumdt.title}</h5>
            <p className="card-text">{props.dumdt.desc}</p>
            <p className="card-text">
              {props.dumdt.startDate}-{props.dumdt.endDate}
            </p>
          </div>
        </a>
      </div>
    </>
  );
}

const Products = () => {
  let [dumdt] = useState(data);
  return (
    <>
      <div>
        {dumdt.map((a, i) => {
          return (
            <ProductsItems
              key={dumdt[i].id}
              dumdt={dumdt[i]}
              i={i + 1}
            ></ProductsItems>
          );
        })}
      </div>
    </>
  );
};




const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                style={{ marginLeft: "150px" }}
              >
                전체
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ marginLeft: "150px" }}>
                지역별
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ marginLeft: "150px" }}>
                인기순/랭킹
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ marginLeft: "150px" }}>
                기타
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

const FestivalsTest =() =>{
    const [festivals, setFestivals] = useState([]);
    useEffect(() => {
      FetivalListDB().then(setFestivals);
    }, []);

  
  return(
  <>
   <div>
        {festivals.data && festivals.data.map((festival, i) => {
 //if(i > 2)

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
  //  }if문
        })}
      </div>

      
  </>
  
    )
}










const FestivalPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Festival 페이지<br/>
        <Link to="/addProducts" style={{fontSize:'40px', backgroundColor:'blue', color:'white', borderRadius:'20%', textDecoration:'none'}}>상품등록버튼</Link>
        <Navbar />
        <FestivalsTest></FestivalsTest><br/>
        {/* <Products /> */}
      </div>
    </>
  );
};

export default FestivalPage;
