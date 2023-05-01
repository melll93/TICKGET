import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/mypage.css";


const Tab1Content = () => {
  const navigate = useNavigate();
  const before = () => {
    navigate(-1);
  };
  return (
    <>
    <div className="mypage_center">
                  <h1>정보를 안전하게 보호하기 위해 </h1>
                  <h1>
                    <span style={{ color: "red" }}> 비밀번호를 다시 한번 확인</span>
                    합니다.{" "}
                  </h1>
                  <br />
                  <h4>비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요.</h4>
                  <br />
                  <br />
                  <p> ID : member_id </p>
                  <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: "150px" }}> 비밀번호 :</p>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      style={{ width: "300px", marginBottom: "100px" }}
                    />
                  </div>
                  <button
                    onClick={before}
                    className="homebtn"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50px",
                      width: "250px",
                      height: "60px",
                      marginRight: "5px",
                    }}
                  >
                    {" "}
                    취소{" "}
                  </button>
                  <button
                    className="homebtn"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "50px",
                      width: "250px",
                      height: "60px",
                    }}
                  >
                    {" "}
                    확인{" "}
                  </button>
                  </div>
                </>
  )
}
export default Tab1Content
