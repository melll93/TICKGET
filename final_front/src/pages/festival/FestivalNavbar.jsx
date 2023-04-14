/*
은영 - 페스티발(메인상품) 창 카테고리별 NavBar 
 */


import React, { useState } from 'react'

const FestivalNavbar = ({changeModal, modal2open, modal2_1open, modal3open, modal4open}) => {
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

            {/* 전체 */}
            <ul className="nav-item">
              <li className="nav-link" onClick={FestTotalModals} style={{ marginLeft: "150px" }}> 전체 </li>
            </ul>{/* end of  전체 */}

{/* 지역별 */}
            <ul className="nav-item">
              <ul className="nav-link" style={{ marginLeft: "150px" }}  onMouseEnter={e => { setStyle({display: 'block'})}} 
              onMouseLeave={e => {setStyle({display: 'none'})}} > 지역별 <ul style={style}>
                <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}> 서울 </li>
            </ul>
                <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}> 경기/인천 </li>
                 </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}> 충청/강원 </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}> 대구/경북 </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Seoul}> 부산/경남 </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}> 광주/전라 </li>
            </ul>
            <ul className="nav-item">
              <li className="nav-link" onClick={Kyeongki}> 제주 </li>
            </ul>
            </ul>
              </ul>
            </ul>{/* end of 지역별 */}

{/* 인기순 */}
            <ul className="nav-item">
              <li className="nav-link" style={{ marginLeft: "150px" }} onClick={modalch}> 인기순/랭킹 </li>
            </ul>

{/* 기타 */}
            <ul className="nav-item">
              <li className="nav-link"  style={{ marginLeft: "150px" }} onClick={modal4}> 기타 </li>
            </ul> {/* end of 기타*/}
          </ul>{/* end of navbar-nav  */}
        </div>{/* end of container-fluid */}
      </nav>{/* end of navbar navbar-expand-sm bg-dark navbar-dark */}
    </>
  );
};
  export default FestivalNavbar
