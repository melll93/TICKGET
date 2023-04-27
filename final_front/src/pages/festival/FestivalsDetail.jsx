import {useCallback, useEffect, useState} from "react";
import {Modal, Tab, Tabs} from "react-bootstrap";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteFestReviewDB, DeleteFestivalDB, FestReviewInsertDB, FestivalReviewDB, FetivalDetailDB,
  UpdateFestReviewDB } from "../../axios/festival/festival";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/festivaldetails.css";
import "../../styles/Calendar.css";
import TicketCancleInfo from "../../components/mypage/TicketCancleInfo";
import {BButton, BlackBtn} from "../../styles/formStyle";
import DropdownButton from "../../components/DropdownButton";
import { Cookies } from "react-cookie";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, onValue, get, set  } from "firebase/database";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../board/carpool/CarpoolBoardList";
import MapContainer from "../board/market/Map/MapContainer";


const FestivalsDetail = () => {
  const navigate = useNavigate();
  const [reviewToBeRevised, setReviewToBeRevised] = useState(null);

  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  const festSelectedTkamt = cookies.get('tk_amount');
  let { festMId } = useParams();
  console.log(_userData)



/* 클릭한 좌석 담기 */
const [selectedFestTcType, setSelectedFestTcType] = useState("일반석");
const [selectedFestTcPrice, setSelectedFestTcPrice] = useState(0);
const [selectedFestTcTime, setSelectedFestTcTime] = useState("모르지");



 const festivalTcClicked = (festTcPrice, festTcType, festTcTime) => {
   setSelectedFestTcType(festTcType) 
   setSelectedFestTcPrice(festTcPrice);
   setSelectedFestTcTime(festTcTime);
   document.cookie = `selectedFestTcPrice=${JSON.stringify(festTcPrice)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
   document.cookie = `selectedFestTcType=${JSON.stringify(festTcType)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
   document.cookie = `selectedFestTcTime=${JSON.stringify(festTcTime)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;

 };


  
  
/* 초기화 */
useEffect(() => {
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  database.ref().on("value", (snapshot) => {
    setFestMData(festMData);
  });
  
  return () => {
    database.ref().off();
  };
}, []); 


/*파이어베이스 - READ  */
const [festMData, setFestMData] = useState(null);  

useEffect(() => {
  const festTcSeatsInfo= async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref(`FestMId/${festMId}/${selectedFestTcTime}-${selectedFestTcType}`)
        .once("value");    //한번읽기
      if (snapshot.exists()) {  //존재하면 여기 타기
        const data = snapshot.val();  
        setFestMData(data);      //받아온 값 담기 
        console.log(festMData)
      } else {
        // 데이터가 존재하지 않는 경우
      }
    } catch (error) {
      console.log("Firebase 데이터 읽기 에러", error);
    }
  };
  festTcSeatsInfo();
}, [selectedFestTcType]);


console.log(festMData)
/* ////////////////////수정중 */
/* 파이어베이스 - update */




const decreaseSeat = () => {
    const aaa = festMData.seatAvailable;
    const updatedSeatAvailable = aaa- festSelectedTkamt ;
    const seatsRef = firebase.database().ref(`FestMId/${festMId}/${selectedFestTcTime}-${selectedFestTcType}/seatAvailable`);
    seatsRef.set(updatedSeatAvailable);
}; 


const researveBtnClicked=()=>{
  if(selectedFestTcPrice&&date&&festSelectedTkamt){
    decreaseSeat()
    navigate("/payment2/" + festMId);
  }else{
       alert('선택된 날짜 | 좌석 | 수량이 없습니다.')
  }
}



/* ////////////////////수정중 */



  const options = [
    { label: '1매', value: '1' },
    { label: '2매', value: '2' },
    { label: '3매', value: '3' },
    { label: '4매', value: '4' },
    { label: '5매', value: '5' },
  ];
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setDate(date);
    const cookie = new Cookies();
    cookie.set('date', date.toISOString());
  };



  const [festival, setFestival] = useState([{
    festMId: "",
    festMName: "",
    festMStart: "",
    festMEnd: "",
    festMLoc: "",
    festMImg: "",
    festPsUrl:"",
    festTcPrice:"",
    festDtRuntime:"",
    festDtAge:"",
    festDtCrew:"",
    festDtCasting:""
  }]);

  useEffect(() => {
    const asyncDB = async () => {
      const res = await FetivalDetailDB({ festMId });
    /*   console.log(res.data) */
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setFestival([{
        festMName: jsonDoc[0].festMName,
        festMStart: jsonDoc[0].festMStart,
        festMEnd: jsonDoc[0].festMEnd,
        festMLoc: jsonDoc[0].festMLoc,
        festMImg: jsonDoc[0].festMImg,
        festDtAge:jsonDoc[0].festDtAge,
        festDtCrew:jsonDoc[0].festDtCrew,
        festDtCasting:jsonDoc[0].festDtCasting,
        festPsUrl:jsonDoc[0].festPsUrl,
        festTcPrice:jsonDoc[0].festTcPrice,
        festDtRuntime:jsonDoc[0].festDtRuntime
      }]);
      if (res.data) {
        setFestival(res.data);
        
      } else {
        console.log("조회 실패");
      }
    };
    asyncDB();
    return () => {};
  }, []);




  const reduxUser = useSelector((state) => state.userStatus.user);
  
  /* 리뷰 */
  const [reviewContent, setReviewContent] = useState("");
  const [lgShow, setLgShow] = useState(false); //리뷰수정모달

  /* 리뷰 작성 textarea clear */
  const resetReviewField = () => {
    setReviewContent("");
    document.querySelector("#product_detail_review_textarea").value = null;
  };

  /* 리뷰  관련*/
  const inputReviewContent = useCallback((e) => {
    setReviewContent(e);
  }, []);

  /* 리뷰 인서트 요기  */
  const insertReview = async () => {
    if(_userData){

      const freview = {
        reviewMemid:_userData.memberNickname,
        reviewContent,
        reviewFestmid: festMId,
      };
      const res = await FestReviewInsertDB(freview);
      //console.log(freview)
      if (!res.data) {
      } else {
      }
      navigate("/productsDetail/" + festMId);
      resetReviewField();
    }else(alert('로그인 시, 이용가능합니다. '))
  };

  /* 상품삭제 */
  const deleteProducts = async () => {
    console.log(festMId);
    const festival = {
      fest_m_id: festMId,
    };
    const res = await DeleteFestivalDB(festival);
    if (!res.data) {
    } else {
    }
    navigate('/festival');
  };





  //리뷰컴포
  const ReviewList = () => {
    const [freviews, setFreviews] = useState([]);
    const [reviewRevisedContent, setReviewRevisedContent] = useState("");

    const inputReviewRevisedContent = useCallback((e) => {
      setReviewRevisedContent(e);
      console.log(e.value);
    }, []);
    useEffect(() => {
      FestivalReviewDB().then(setFreviews);
    }, []);
    return (
      <>
        {freviews &&
          freviews.map((review, i) => {
            if (festMId === review.reviewFestmid) {
              return (
                <div
                  key={review.reviewNo}
                  className="product_detail_review_comment"
                  style={{
                    borderBottom: "1px solid lightgray",
                    width: "1100px",
                    margin: "50px",
                  }}
                >
                  <h3>{review.reviewContent}</h3>
                 작성자: {review.reviewMemid} 등록일: {review.reviewRegdate}
                  {
                    //로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람과 작성자 일치 시 수정, 삭제 버튼 보이기
                    // sessionStorage.getItem('Member_name')==='Member_name(작성자)'&&
                    <div>

                      {_userData&& _userData.memberNickname===review.reviewMemid? 
<div>
                        <BButton
                        style={{ width: "80px", height: "38px" }}
                        onClick={()=>{ 
                          console.log(review.reviewNo);
                          setLgShow(true);
                          setReviewToBeRevised(review); 
                          console.log(review.reviewNo);

                        }}
                        >
                        수정
                      </BButton>

                      <BButton
                        style={{ width: "80px", height: "38px" }}
                        onClick={async () => {
                          const freview = {
                            review_no: review.reviewNo,
                          };
                          const res = await DeleteFestReviewDB(freview);
                          if (!res.data) {
                          } else {
                          }
                          navigate("/productsDetail/" + festMId);
                          console.log("삭제완료");
                        }}
                        >
                        삭제
                      </BButton>
                      </div>
                      :null}


                        {/*/////////////////////////////리뷰 수정 모달//////////////////////////////////*/}
  
                        <Modal
                          size="lg"
                          show={lgShow}
                          onHide={() => setLgShow(false)}
                          aria-labelledby="example-modal-sizes-title-lg"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                              리뷰수정
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="form-floating mb-3">
                              <textarea
                                onChange={(e) => {
                                  inputReviewRevisedContent(e.target.value);
                                }}
                                className="form-control2"
                                placeholder="Leave a comment here"
                                id="product_detail_review_revised_textarea"
                                style={{
                                  height: "150px",
                                  margin: "10px",
                                  width: "97%",
                                }}
                              ></textarea>
                              <BlackBtn
                                className="reviseBtn"
                                onClick={async () => {
                                  setLgShow(true);
                                  const freview = {
                                    reviewNo: reviewToBeRevised.reviewNo,
                                    reviewContent: reviewRevisedContent,
                                  };
                                  const res = await UpdateFestReviewDB(freview);
                                  if (!res.data) {
                                  } else {
                                  }
                                  setLgShow(false);
                                  console.log(
                                    "수정완료" +
                                      reviewRevisedContent +
                                      freview.reviewNo
                                  );
                                  console.log("리뷰번호" + freview.reviewNo);
                                }}
                              >
                                수정완료
                              </BlackBtn>
                            </div>
                            <br />
                          </Modal.Body>
                        </Modal>
                        {/* //////   리뷰 수정용 모달    여기까지///////*/}



                    </div>
                  }
                </div>
              ); //안쪽리턴
            }
          })}
      </>
    ); //리턴끝
  }; //ReviewList 끝







console.log(festival)



  return (
    <>

        <Header />
      <Sidebar />
      <div className="center">



        {/* 로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람이 관리자일경우 삭제 버튼 보이기 
   {sessionStorage.getItem('Auth')===''관리자"'&&       
   */}
          {_userData && _userData.memberAuthority==="ROLE_ADMIN" ? 
        <div>
          <BlackBtn onClick={deleteProducts} width='100px'>상품삭제</BlackBtn>
          <Link to={`/addProducts/${festMId}`}>
          <BlackBtn width='100px'>상품수정</BlackBtn>
        </Link>
       </div>
       :null}
       





        <div className="totalcontainer">
          {/* //////////////////////////////////////탑 섹션///////////////////////////////////////////////////////////////////// */}
          <section>
            <div className="topcontainer">
              <div className="product_detail_imgdiv">
                <img
                  className="product_detail_img"
                  src={festival[0].festMImg}
                  alt="상품사진"
                />
              </div>
              <div className="product_detail_info">
                <div className="product_detail_head">
                  <h3 className="product_title">{festival[0].festMName}</h3>
                  <p className="product_sub_title">subtitle</p>
                </div>
                <div className="product_info"></div>
                <ul className="product_lnfo_list_col2">
                  <li className="product_info_list">
                    <span className="product_info_title">장소</span>
                    <div className="product_info_desc">{festival[0].festMLoc}</div>
                  </li>
                  <li className="product_info_list">
                    <span className="product_info_title">관람시간</span>
                    <div className="product_info_desc">{festival[0].festDtRuntime===null? <p>미제공</p>: <p>{festival[0].festDtRuntime}</p>}</div>
                  </li>
                  <li className="product_info_list">
                    <span className="product_info_title">기간</span>
                    <div className="product_info_desc">
                      {festival[0].festMStart}~{festival[0].festMEnd}
                    </div>
                  </li>
                  <li className="product_info_list">
                    <span className="product_info_title">관람등급</span>
                    <div className="product_info_desc">{festival[0].festDtAge===null? <p>미제공</p>: <p>{festival[0].festDtAge}</p>}</div>
                  </li>
                </ul>



                <ul className="product_lnfo_list_col2">
                  <li className="product_info_list">
                    <span className="product_info_title">출연진</span>
                    <div className="product_info_desc">
                      <ul className="product_info_sublist" style={{paddingLeft:'0px', paddingRight:'20px'}}>

                        <li className="product_info_subitem" >
                         {festival[0].festDtCasting===null? <p style={{display:'inline'}}>(미정) </p>: <p style={{display:'inline'}}>{festival[0].festDtCasting}</p>}  
                        </li>

                      </ul>
                    </div>
                  </li>
                  <li className="product_info_list">
                    <span className="product_info_title">제작진</span>
                    <div className="product_info_desc">
                      <ul className="product_info_sublist">
                        <li className="product_info_subitem">
                         { festival[0].festDtCrew===null? <p style={{display:'inline'}}>제작진(미공개)</p>: <p style={{display:'inline'}}>{festival[0].festDtCrew}</p>}
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {/* //////////////////////////////////////미드 섹션////////////////////////////////////////////////////////////////// */}

          <section>
            <div className="midContainerCalendarAndRestSeats">
              <span className="products_calendar">
                <Calendar value={date} onChange={handleDateChange}/>
              </span>
              <div className="calendarands1" style={{borderLeft:'1px dotted gray', borderRight:'1px dotted gray' , padding:'20px'}}>
          <strong>
            <p style={{color:'red'}}>[좌석 선택]</p>
            </strong>
            



            {festival.map((fest, i) => (     <div  key={i}   className="product_detail_description"
    style={{       maxWidth: "1250px",      maxHeight: "1000px",     }}  >
    {fest.festTcType === null ? (      null    ) : (
<div key={i} className={`product_info_subitem${selectedFestTcTime === fest.festTcTime && selectedFestTcPrice === fest.festTcPrice && selectedFestTcType===fest.festTcType ? 'active' : ''}`} onClick={() => festivalTcClicked(fest.festTcPrice, fest.festTcType, fest.festTcTime)} style={{border: '1px solid gray', borderRadius: '10px', marginTop:'5px'}}>
{ fest.festTcTime===null? null: <p style={{display:'inline',}}>{fest.festTcTime} - </p>}
{ fest.festTcType===null? null: <p style={{display:'inline'}}>{fest.festTcType} - </p>}  
{ fest.festTcPrice===null? null: <p style={{display:'inline'}}>{fest.festTcPrice}원</p>}
 </div>
    )}
    {i === festival.length - 1 && fest.festTcType === null ? (
null
    ) : null}
  </div>
))}



              </div>
              
              
              <div className="calendarands2">
                <div style={{border:'1px solid red', margin: '10px', alignItems:'center'}}>
                <h4 style={{color:'red', textDecoration:'underline'}}>[선택 좌석]</h4> {selectedFestTcType}  -   {selectedFestTcPrice}  원
                </div>

                <div style={{border:'1px solid red', margin: '10px', alignItems:'center'}}>
                <h4 style={{color:'red', textDecoration:'underline'}}>[잔여좌석]</h4> 
              
              
                {/* 파이어 베이스 - 좌석정보*/}

{/* 클릭한 값 뜨게 하기 */}

                <div>
      {festMData && (
        <div>
          <div>{festMData.time}</div>
          <div>{festMData.type}</div>
          <div>{festMData.price}원</div>
         <div>{festMData.seatAvailable}/{festMData.seatTotal} </div>
        </div>
      )}
    </div>



                    {/* 파이어 베이스 - 좌석정보 끝 */}




                </div>
                구매 수량 : <DropdownButton options={options} ></DropdownButton>
                
                <BlackBtn
                  width="250px"
                  style={{marginTop:'120px'}}
                  onClick={researveBtnClicked}
                >
                  예매하기
                </BlackBtn>
              </div>
            </div>
          </section>
          {/* ////////////////////////////////////// 바텀 섹션///////////////////////////////////////////////////////////////////// */}
          <section>
            <div className="bottomcontainer" style={{ marginLeft: "220px" }}>
              <Tabs
                style={{ maxWidth: "1200px",fontFamily: "Nanum Gothic", fontWeight: "bold" }}
                defaultActiveKey="product_detail_description"
                id="justify-tab-example"
                className="product_detail_tabs"
                justify
              >
                <Tab eventKey="product_detail_description" title="상세정보">
                  
                  
                  
                {festival.map((fest, i) => (
                  <div
    key={i}
    className="product_detail_description"
    style={{
       maxWidth: "1250px",
      maxHeight: "1000px", 
    }}
  >
    {fest.festPsUrl === null ? (
      null
    ) : (
      <img src={fest.festPsUrl} alt="상품상세정보이미지" />
    )}
    {i === festival.length - 1 && fest.festPsUrl === null ? (
      <div style={{ margin: '50px' }}>
        <h1 style={{ margin: '50px' }}>상세보기 이미지 정보가 없습니다.</h1>
        <TicketCancleInfo />
      </div>
    ) : null}
  </div>
))}

                </Tab>


                <Tab eventKey="product_detail_place" title="공연장 위치">
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "calc(100% - 140px)", marginTop: "50px", marginRight:'450px' }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" , marginRight:'50px'}}>
                  <p style={{ fontFamily: "Nanum Gothic", fontWeight: "bold", fontSize: "1.8rem", marginBottom: "20px" }}>
                    <i class="bi bi-geo-alt-fill"></i>
                    {" "}
                   {festival[0].festMLoc}
                  </p>
                  <div style={{ width: "40%", borderTop: "1px solid black", marginBottom: "10px", opacity: "15%" }} />
                </div>
               <MapContainer place={ festival[0].festMLoc } /> 
              </div>

</Tab>

                <Tab eventKey="product_detail_review" title="상품리뷰">
                  리뷰리뷰
                  <div
                    className="product_detail_review"
                    style={{
                      maxWidth: "1250px",
                      height: "1000px",
                    }}
                  >
                    <div
                      className="product_detail_review_heading"
                      style={{
                        margin: "50px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <h3>관람 후기</h3>
                    </div>

                    <div
                      className="form-floating"
                      style={{ textAlign: "right" }}
                    >
                      <textarea
                        onChange={(e) => {
                          inputReviewContent(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="product_detail_review_textarea"
                        style={{
                          height: "300px",
                          margin: "10px",
                          maxWidth: "1200px",
                        }}
                      ></textarea>
                      <label htmlFor="floatingTextarea">관람후기</label>
                      <BlackBtn
                        width="250px"
                        height="50px"
                        margin="10px 80px 10px 10px"
                        onClick={insertReview}
                      >
                        {" "}
                        등록{" "}
                      </BlackBtn>
                    </div>

                    <ReviewList></ReviewList>
                  </div>
                </Tab>
              </Tabs>
            </div>{" "}
            {/* bottom container */}
          </section>
        </div>{" "}
        {/* totalcontainer div */}
      </div>{" "}
      {/* center div */}
    </>
  );
};

export default FestivalsDetail;
