import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import data from "./data";

function ProductsItems(props) {
  return (
    <>
      <div
        class="card"
        style={{
          width: "18rem",
          display: "inline-block",
          margin: "50px 0px 0px 50px",
        }}
      >
        <a
          style={{ textDecoration: "none", color: "black" }}
          href={"/productsDetail/" + props.i}
        >
          <img
            src={"images_key/fev" + props.i + ".PNG"}
            width="100%"
            alt="사진1"
          />
          <div class="card-body">
            <h5 class="card-title">{props.dumdt.title}</h5>
            <p class="card-text">{props.dumdt.desc}</p>
            <p class="card-text">
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
      <nav class="navbar navbar-expand-sm bg-light navbar-light">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link active"
                href="#"
                style={{ marginLeft: "150px" }}
              >
                전체
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={{ marginLeft: "150px" }}>
                지역별
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={{ marginLeft: "150px" }}>
                인기순/랭킹
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={{ marginLeft: "150px" }}>
                기타
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

const FestivalPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Festival
        <Link to="/addProducts">상품등록</Link>
        <div>이미지 1, 이미지 2, 이미지 3, 이미지4</div>
        <Navbar />
        <Products />
      </div>
    </>
  );
};

export default FestivalPage;
