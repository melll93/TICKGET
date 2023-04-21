import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import BasicTable from "../../components/mainpage/BasicTable";
import Header from "../../components/Header";
import CarouselList from "../../components/mainpage/CarouselList";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import CalendarPage from "../menu/CalendarPage";
import { festivalListByDate } from "../../axios/festival/festival";
import { festivalHitListDB } from "../../axios/festival/festival";
import { selectTogetherDB } from "../../axios/board/together/TogetherLogic";

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
  const [boardList, setBoardList] = useState([]);



  const getTodayList = () => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() - 2;
    const date = getDate.getDate();
    const fullDate = year + "-" + month + "-" + date;
/*     console.log(fullDate); */
    // paramete : YYYY-MM-DD
    festivalListByDate(fullDate).then(console.log);
    festivalListByDate(fullDate).then(setFestivalToday);
  };

  useEffect(() => {
    getTodayList();
    selectBoardList();
  }, []);



  useEffect(() => {
    const festivalHitList = async () => {
      const festMHit = true; 
      const result = await festivalHitListDB(festMHit); 
      setFestivalHitList(result); 
    };
    festivalHitList(); 
    console.log(festivalHitList);
  }, []);


  const selectBoardList = async () => {
    const res = await selectTogetherDB();
    console.log(res.data);
    if (res.data && Array.isArray(res.data)) {
      setBoardList(res.data);
    } else {
      console.log("부서목록 조회 실패");
    }
  };



  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <div style={{ margin: "100px 0px 20px 0px", width: "1900px" }}>
          <CarouselList festivalToday={festivalToday} />
        </div>
<section className="home_bottom_section" style={{border:'1px dotted gray', padding:'50px'}}>
<div style={{textAlign:'center', alignItems:'center'}}>
<h1 style={{fontFamily:"Nanum Gothic", fontWeight:"bold"}}>
  WHAT'S HOT
  </h1>
  {festivalHitList.slice(0, 5).map((festival) => (
    <Card.Img key={festival.festMId} src={festival.festMImg} style={{width:'150px', height:'200px', marginRight:'20px'}} alt="Card image" />
        ))}
</div>
</section>

        <section className="home_total_sec" style={{paddingLeft: "150px", backgroundColor:"lightgray"}}>
          <div className="total_section" style={{ display: "flex" }}>

{/* 위클리랭킹 */}
            <div
              className="mainpage div div2"
              style={{ flex: "1", margin: "50px" }}
            >
              <div className="mainpage box">
                <div className="mainpage div div1">
                  <Tabs
                    defaultActiveKey="together"
                    id="uncontrolled-tab-example"
                    className="margin0 mb-3"
                  >
                    <Tab eventKey="together" title="Together">

  <BasicTable items={boardList} />


                    </Tab>
                    <Tab eventKey="carpool" title="Carpool">


                      <BasicTable />

                    </Tab>
                    <Tab eventKey="market" title="Market">

                      <BasicTable />


                    </Tab>
                  </Tabs>
                </div>{" "}
              </div>{" "}
            </div>
{/* 위클리랭킹 */}


            {/* 지역별 추천 */}
            <div
              className="top_sec_div"
              style={{ margin: "50px", textAlign: "center", flex: "1" }}
            >
              <div className="card" style={{display:'inline-block'}}>
                <p>지역별 추천</p>
                <img src="./images_key/WOONGS.jpg" style={{width:'150px', margin:'15px'}}alt="사진1" />
                <img src="./images_key/WOONGS.jpg" style={{width:'150px', margin:'15px'}}alt="사진1" />
                <img src="./images_key/WOONGS.jpg" style={{width:'150px', margin:'15px'}}alt="사진1" />
                <br/>
                제목
                <div className="card-body">
                  <h5 className="card-title">설명 </h5>
                  <p className="card-text">설명2 </p>
                </div>
              </div>
            </div>

{/* 지역별 추천 여기까지 */}
   


          </div>
        </section>







      </div>{/* center */}
    </>
  );
};

export default HomePage;