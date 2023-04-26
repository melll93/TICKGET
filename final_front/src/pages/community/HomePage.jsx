import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/mainpage/BasicTable";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarouselList from "../../components/mainpage/CarouselList";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import CalendarPage from "../menu/CalendarPage";
import { festivalListByDate } from "../../axios/festival/festival";
import { festivalHitListDB } from "../../axios/festival/festival";
import { Link } from "react-router-dom";
import { searchById } from "../../axios/member/member";
import UserProfile from "../../components/UserProfile";
import { selectTogetherDB } from "../../axios/board/together/TogetherLogic";
import { selectCarpoolDB } from "../../axios/board/carpool/CarpoolLogic";
import { mk_boardListDB } from "../../axios/board/market/marketLogic";

const HomePage = () => {
  /******************************
   * SearchBar : keyword 검색해서 페이지 이동(/search)
   * MainCarousel : 오늘 날짜로 검색해서 뿌려주기,
   * BasicTable : 게시판 별 최신 글 출력해주기, Link to
   * MainCalendar : 날짜 클릭하면 하단에 해당 날짜별 축제 출력해주기(Grid)
   ******************************/
  const reduxUser = useSelector((state) => state.userStatus.user);

  const [festivalToday, setFestivalToday] = useState([]);
  const [festivalHitList, setFestivalHitList] = useState([]);

  const getTodayList = () => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() - 2;
    const date = getDate.getDate();
    const fullDate = year + "-" + month + "-" + date;
/*     console.log(fullDate); */
    // paramete : YYYY-MM-DD
 /*    festivalListByDate(fullDate).then(console.log); */
    festivalListByDate(fullDate).then(setFestivalToday);
  };

  useEffect(() => {
    getTodayList();

    const festivalHitList = async () => {
      const festMHit = true; // festHit 변수에 true 값을 할당하여 HIT가 높은 순으로 데이터를 가져옴
      const result = await festivalHitListDB(festMHit); // FestivalHitListDB 함수를 호출하여 데이터를 가져옴
      console.log(result)
      setFestivalHitList(result); // 가져온 데이터를 상태값에 할당
    };
    festivalHitList(); // 데이터 가져오기
  }, []);
    



  /* ******************************************
   *****메인화면 좌측 하단 테이블 (Together) *****
   ********************************************  */
  const [boardList, setBoardList] = useState([]);
  const selectBoardList = async () => {
    const res = await selectTogetherDB();
   /*  console.log(res.data); */
    if (res.data && Array.isArray(res.data)) {
      setBoardList(res.data);} else {console.log("부서목록 조회 실패");}};
  useEffect(() => {selectBoardList();}, []);

  const boardListProps = boardList.map(item => {
    return {
      no: item.boardTgNo,
      title: item.boardTgTitle,
      detail: item.boardTgViews,
      link:"/together/boardDetail/",
      url:"",
    };
  });
  
 /* ******************************************
   *****메인화면 좌측 하단 테이블 (Carpool) *****
   ********************************************  */
   const [carpoolList, setCarpoolList] = useState([]);
   const selectCarpoolList = async () => {
    const res = await selectCarpoolDB();
    if (res.data && Array.isArray(res.data)) {
      setCarpoolList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }};
   useEffect(() => {selectCarpoolList();}, []);
   const carpoolListProps = carpoolList.map(item => {
    return {
      no: item.boardCpNo,
      title: item.boardCpTitle,
      detail: item.boardCpContent,
      link:"/carpool/carpoolDetail/",
      url:"",
    };
  });

    
 /* ******************************************
   *****메인화면 좌측 하단 테이블 (Market) *****
   ********************************************  */

  const [mkboards, setMkboards] = useState([]);
   const selectMkBoardList = async () => {
    const res = await mk_boardListDB();
    if (res.data && Array.isArray(res.data)) {
      setMkboards(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };
  useEffect(() => {selectMkBoardList();}, []);
  const mkboardsProps = mkboards.map(item => {
    return {
      no: item.boardMkNo,
      title: item.boardMkTitle,
      detail: item.mkTicketSeat,
      link:"market/mk_boardDetail/?no=",
      url:item.boardMkFileurl,
    };
  });
   

 /* ******************************************
   ***** WHAT'S HOT 호버이벤트 *****
   ********************************************  */
   const [hovered, setHovered] = useState(Array(5).fill(false)); // 초기값: 5개의 요소에 대해 false
   
 /*   festMLoc
   festMName
   festMStart */
  



  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <div style={{ margin: "40px 0px 0px 0px", width: "1900px" }}>
          <CarouselList festivalToday={festivalToday} />
        </div>

        <section
          className="home_bottom_section"
          style={{
            /*   border:'1px dotted gray',  */
            paddingBottom: "50px",
          }}
        >
          <div style={{ textAlign: "center" , fontFamily:'Nanum-Gothic', fontWeight:'bold'}}>
            <h1 style={{ fontFamily:'Nanum-Gothic', fontWeight:'bold',  marginTop:'100px', marginBottom:'30px'}}>
            WHAT'S HOT
            </h1>
            {festivalHitList.slice(0, 5).map((festival, i) => (
  <Link to={`/productsDetail/${festival.festMId}`} key={i}>

    <Card.Img
      key={i}
      src={festival.festMImg}
      style={{
        width: "200px",
        height: "250px",
        marginRight: "20px",
        transform: hovered[i] ? "scale(1.2)" : "",
        transition: "transform 0.3s ease-in-out"
      }}
      onMouseEnter={() => { // 마우스를 요소 위로 올리면
        setHovered(prevState => {
          const newState = [...prevState]; // 상태값 배열 복사
          newState[i] = true; // 현재 요소에 대해 true로 변경
          return newState; // 변경된 배열 반환
        });
      }}
      onMouseLeave={() => { // 마우스를 요소에서 떠나면
        setHovered(prevState => {
          const newState = [...prevState]; // 상태값 배열 복사
          newState[i] = false; // 현재 요소에 대해 false로 변경
          return newState; // 변경된 배열 반환
        });
      }}
      alt="Card image"
 />
  </Link>
))}
          </div>
        </section>

        <section
          className="home_total_sec"
          style={{ backgroundColor: "lightgray"}}
        >
          <div className="total_section" style={{ display: "flex", marginTop:'200px' }}>

            {/* 메인하단 최신게시글 */}
              <div className="mainpage box" style={{flex: "1",  padding:'50px 0px 0px 170px'}}> 
                <div className="mainpage div div1" >
          <h4 style={{fontWeight:'bold'}}><i class="bi bi-clipboard"></i>{" "}최근 게시글</h4>
                  <Tabs
                    defaultActiveKey="market"
                    id="uncontrolled-tab-example"
                    className="margin0 mb-3"
                  >
                                        <Tab eventKey="market" title="Market">
               <BasicTable items={mkboardsProps}/> 
                    </Tab>
                    <Tab eventKey="together" title="Together">
                      
                      <BasicTable items={boardListProps}/>
                   
                    </Tab>
                    <Tab eventKey="carpool" title="Carpool">
                   <BasicTable items={carpoolListProps}/> 
                    </Tab>

                  </Tabs>
                </div>{" "}
            </div>
            {/* 메인하단 최신게시글 */}




            {/* 지역별 추천 */}
            <div
              className="top_sec_div"
              style={{ marginTop: "50px", 
              marginBottom: "50px", textAlign: "center", flex: "1",
            paddingRight:'100px', display:"inline-block"}}
            >
                <h4 style={{fontWeight:'bold'}}><i class="bi bi-command"></i>{" "}연계 추천 사이트</h4>
              <div className="card" style={{ display: "inline-block", marginRight:'5px'}}>
                <img
                  src="./images_key/travelgajae.jpg"
                  style={{ width: "200px",height:'250px', margin: "15px" }}
                  alt="사진1"
                  />
                  <div className="card-body">
                  <h5 className="card-title">[숙박]트래블가재</h5>
                  <a href="#" className="card-text">http://travelgajae.com</a> 
                  </div>
              </div>

              


                
                <div className="card" style={{ display: "inline-block" }}>
                <img
                  src="./images_key/triptoday.png"
                  style={{ width: "200px", height:'250px', margin: "15px" }}
                  alt="사진1"
                />
                  <div className="card-body">
                  <h5 className="card-title">[숙박]오늘의여행 </h5>
                  <a href="#" className="card-text">http://triptoday.com </a>
                </div>
                </div>

                <div className="card" style={{ display: "inline-block",  marginRight:'5px' }}>
                <img
                  src="./images_key/khsrcarecenter.jpg"
                  style={{ width: "200px",height:'250px', margin: "15px" }}
                  alt="사진1"
                />
                  <div className="card-body">
                  <h5 className="card-title"> [숙박]KH요양원 </h5>
                  <a href="#" className="card-text">http://srcarecenter.com </a>

                </div>
            </div>
            </div>
            {/* 지역별 추천 여기까지 */}
          </div>
        </section>

        <Footer/>
      </div>
      {/* center */}
    </>
  );
};

export default HomePage;
