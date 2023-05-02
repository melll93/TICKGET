import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/mainpage/BasicTable";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarouselList from "../../components/mainpage/CarouselList";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { festivalListByDate } from "../../axios/festival/festival";
import { festivalHitListDB } from "../../axios/festival/festival";
import { Link } from "react-router-dom";
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
      console.log(result);
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
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };
  useEffect(() => {
    selectBoardList();
  }, []);

  const boardListProps = boardList.map((item) => {
    return {
      no: item.boardTgNo,
      title: item.boardTgTitle,
      detail: item.boardTgViews,
      link: "/together/boardDetail/",
      url: "",
      writer: item.boardTgMemId
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
    }
  };
  useEffect(() => {
    selectCarpoolList();
  }, []);
  const carpoolListProps = carpoolList.map((item) => {
    return {
      no: item.boardCpNo,
      title: item.boardCpTitle,
      detail: item.boardCpContent,
      link: "/carpool/carpoolDetail/",
      url: "",
      writer: item.boardCpMemId
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
  useEffect(() => {
    selectMkBoardList();
  }, []);
  const mkboardsProps = mkboards.map((item) => {
    return {
      no: item.boardMkNo,
      title: item.boardMkTitle,
      detail: item.mkTicketSeat,
      link: "market/mk_boardDetail/?no=",
      url: item.boardMkFileurl,
      writer: item.memberId
    };
  });

  /* ******************************************
   ***** WHAT'S HOT 호버이벤트 *****
   ********************************************  */
  const [hovered, setHovered] = useState(Array(5).fill(false)); // 초기값: 5개의 요소에 대해 false

  return (
    <>
      <Header />
      <Sidebar/>
      <div className="center">
        <div
          style={{
            margin: "40px 0px 0px 0px",
            width: "1000px",
            height: "1000px",
          }}
        >
          <CarouselList festivalToday={festivalToday}/>
        </div>

        <section
          className="home_bottom_section"
          style={{
            /*   border:'1px dotted gray',  */
            paddingBottom: "50px",
          }}
        >
          <div style={{ textAlign: "center", fontFamily: 'Nanum-Gothic', fontWeight: 'bold' }}>
            <h1 style={{ fontFamily: 'Nanum-Gothic', fontWeight: 'bold', marginTop: '-400px', marginBottom: '50px' }}>
              <span>WHAT'S HOT</span>
            </h1>
            {festivalHitList.slice(0, 5).map((festival, i) => (
              <Link to={`/productsDetail/${festival.festMId}`} key={i}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "20px"
                  }}
                >

                  <div style={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "40px",
                    border: '3px solid white',
                    borderRadius: "50%",
                    backgroundColor: "rgb(236,125,40)",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    visibility: hovered[i] ? "hidden" : "visible", // 순위가 보이지 않도록 CSS 스타일 수정
                    transition: "visibility 0.01s ease-in-out"
                  }}>
                    {i + 1}
                  </div>
                  <Card.Img
                    key={i}
                    src={festival.festMImg}
                    style={{
                      width: "250px",
                      height: "300px",
                      filter: hovered[i] ? "brightness(40%)" : "",
                      transition: "filter 0.2s ease-in-out"
                    }}
                    onMouseEnter={() => {
                      setHovered(prevState => {
                        const newState = [...prevState];
                        newState[i] = true;
                        return newState;
                      });
                    }}
                    onMouseLeave={() => {
                      setHovered(prevState => {
                        const newState = [...prevState];
                        newState[i] = false;
                        return newState;
                      });
                    }}
                    alt="Card image"
                  />
                  {hovered[i] && (
                    <div
                      style={{
                        textAlign: 'center',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        borderRadius: "5px"
                      }}
                    >
                      <p style={{ fontWeight: "bold", fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {festival.festMName}
                      </p>
                      <p style={{ fontSize: '0.7rem' }}>{festival.festMStart}</p>
                      <p style={{ fontSize: '0.8rem' }}>{festival.festMLoc}</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <Link to={'./productsDetail/FT000149'}>
            <div style={{ marginTop: '250px', textAlign: "center" }}>
              <img src="./images_key/앨리스.png" style={{ width: "100%", height: 'auto' }} />
            </div>
          </Link>
        </section>

        <section
          className="home_total_sec"
          style={{ backgroundColor: "white" }}
        >
          <div
            className="total_section"
            style={{ display: "flex", marginTop: "150px" }}
          >
            {/* 메인하단 최신게시글 */}
            <div
              className="mainpage box"
              style={{ flex: "1", padding: "20px 0px 0px 170px" }}
            >
              <div className="mainpage div div1">
                <h4 style={{ fontWeight: "bold", textAlign: "center" }}>
                  <i class="bi bi-clipboard"></i> 최근 게시글
                </h4>

                <Tabs
                  defaultActiveKey="market"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                  style={{
                    fontFamily: "Nanum-Gothic",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  <Tab eventKey="market" title="MARKET">
                    <BasicTable items={mkboardsProps} />
                  </Tab>
                  <Tab eventKey="together" title="TOGETHER">
                    <BasicTable items={boardListProps} />
                  </Tab>
                  <Tab eventKey="carpool" title="CARPOOL">
                    <BasicTable items={carpoolListProps} />
                  </Tab>
                  <style>
                    {`
      .nav-link.unselectable {
        color: purple;
      }
    `}
                  </style>
                </Tabs>
              </div>{" "}
            </div>
            {/* 메인하단 최신게시글 */}

            {/* 지역별 추천 */}
            <div
              className="top_sec_div"
              style={{
                marginTop: "50px",
                marginBottom: "50px", textAlign: "center", flex: "1",
                paddingRight: '100px', display: "inline-block"
              }}
            >
              <h4 style={{ fontWeight: 'bold' }}><i class="bi bi-command"></i>{" "}연계 추천 사이트</h4>
              <div className="card" style={{ display: "inline-block", marginRight: '5px' , marginTop:'20px'}}>
                <img
                  src="./images_key/travelgajae.jpg"
                  style={{ width: "200px", height: "250px", margin: "15px" }}
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
                  style={{ width: "200px", height: "250px", margin: "15px" }}
                  alt="사진1"
                />
                <div className="card-body">
                  <h5 className="card-title">[숙박]오늘의여행 </h5>
                  <a href="#" className="card-text">http://triptoday.com </a>
                </div>
              </div>

              <div
                className="card"
                style={{ display: "inline-block", marginRight: "5px" }}
              >
                <img
                  src="./images_key/khsrcarecenter.jpg"
                  style={{ width: "200px", height: "250px", margin: "15px" }}
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
<div style={{marginTop:'200px'}}>

        <Footer />
</div>
      </div>
      {/* center */}
    </>
  );
};

export default HomePage;
