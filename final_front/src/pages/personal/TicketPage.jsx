import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PaymentComponent from "../payment/PaymentComponent";
import Footer from "../../components/Footer";
import TicketCancleInfo from "../../components/mypage/TicketCancleInfo";
import { ContainerDiv, HeaderDiv } from "../../styles/formStyle";
import { Cookies } from "react-cookie";
import { paymentDetail } from "../../axios/payment/paymentLogic";

const cookies = new Cookies();

const TicketPage = () => {
  /* const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileInput = (e) => {
    console.log(e);
    setSelectedFile(e);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(
        "http://localhost:8888/api/image-upload",
        formData
      );
      setImageURL(res.data);
      console.log("완료");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageURL);
 */


  //회원 정보
  const _userData = cookies.get("_userData");
  /*  console.log(_userData) */

  let member_nickname = '';
  let member_id = '';
  let member_no;
  if (_userData) {
    member_nickname = _userData.memberNickname;
    member_id = _userData.memberId;
    member_no = _userData.memberNo;

  }

  const [plist , setPlist] = useState([])

  //결제내역 불러오기
  useEffect(()=>{
  const paymentList = async() => {
    const pData = {
      memberNo : member_no
    }
    const res = await paymentDetail(pData)
    console.log(res.data)
    setPlist(res.data)
  }
paymentList()
  },[])

    //연월일 날짜 시간 표기방법으로 변경코드
    function getFormattedDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
    }

  return (
    <>
       {/* <div className="cloudinary_image">
        <input type="file" onChange={(e)=>{handleFileInput(e.target.files[0])}} />
        <button onClick={handleUpload}>파일 저장</button>
        {<img src="" alt="uploaded image" />}
        {imageURL && <img src={imageURL} alt="uploaded image" />}
        
      </div> */}
      <Header />
      <Sidebar />
      <div className="center">
          <HeaderDiv>
          </HeaderDiv>
              <section>
            <div className="MainDIv" style={{marginTop:'100px'}}>
                <div className="main_center_div">
                    <h1 className="top_line" style={{fontWeight:'bold'}}><i class="bi bi-card-checklist"></i>&nbsp;결제 내역 확인</h1>

                    <div className="p_text" style={{fontWeight:'bold'}}>
                        <span className="strong_font">결제번호</span>를 꼭 확인
                        부탁드립니다.
                    </div>

                    {/* <button className="mypage_btn" style={{fontWeight:'bold'}}> 전체조회 </button> */}

                    <table className="table">
                        <thead className="thead-dark" style={{backgroundColor:'rgb(50, 50, 120)'}}>
                            <tr>
                             <th scope="col" style={{ textAlign: 'center' }}>번호</th>
                                <th scope="col" style={{ textAlign: 'center' }}>결제번호</th>
                                <th scope="col" style={{ textAlign: 'center' }}>티켓명</th>
                                <th scope="col" style={{ textAlign: 'center' }}>공연일</th>
                                <th scope="col" style={{ textAlign: 'center' }}>매수</th>
                                {/* <th scope="col">취소가능일</th> */}
                                <th scope="col" style={{ textAlign: 'center' }}>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 맵돌려야징 */}
                            {plist.map((data, index) => (
                            <tr style={{fontWeight:'bold'}}>
                                <th scope="row" style={{ textAlign: 'center' }}>{index + 1}</th>
                                <td style={{ textAlign: 'center' }}>{data.paymentOrderId}</td>
                                <td style={{ textAlign: 'center' }}>{data.paymentOrderName}</td>
                                <td style={{ textAlign: 'center' }}>{getFormattedDate(data.paymentFestDate)}</td>
                                <td style={{ textAlign: 'center' }}>{data.paymentCount}</td>
                              {/*   <td>ticket_date</td> */}
                                <td style={{ textAlign: 'center' }}>결제완료</td>
                            </tr>
                                  ))}
                            {/* 맵돌려야징 */}
                        </tbody>
                    </table>

                    {/* 페이지네이션.....컴포로 옮겨야함... */}
                    <nav aria-label="Page navigation example" style={{marginTop:'50px'}}>
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span className="sr-only">이전</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span className="sr-only">다음</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* 페이지네이션 여기까지 */}

                    <div className="cancle_info" style={{marginTop:'150px'}}>
                        <TicketCancleInfo></TicketCancleInfo>
                    </div>
                </div>{" "}
                {/* main_center_div */}
            </div>{" "}
            {/* MainDiv */}
            <div style={{marginTop:'150px'}}>
            <Footer/>
            </div>
        </section>
       </div>
    </>
  );
};

export default TicketPage;
