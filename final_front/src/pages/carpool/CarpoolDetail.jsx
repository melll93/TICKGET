import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CarpoolDetailDB, deleteCarpoolDB } from "../../axios/carpool/CarpoolLogic";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FormDiv } from "../../styles/formStyle";
import LandingPage from "./Map/LandingPage";

const CarpoolDetail = () => {
  const navigate = useNavigate();
  const { carpoolNo } = useParams();

  const [carpool, setCarpool] = useState({
    carpoolNo: 0,
    carpoolMemId: "",
    carpoolTitle: "",
    carpoolContent: "",
    carpoolDate: "",
  });
  useEffect(() => {
    const asyncDB = async () => {
      const res = await CarpoolDetailDB({ carpoolNo });
      console.log(res);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      setCarpool({
        carpoolNo: jsonDoc.carpoolNo,
        carpoolMemId: jsonDoc.carpoolMemId,
        carpoolTitle: jsonDoc.carpoolTitle,
        carpoolContent: jsonDoc.carpoolContent,
        carpoolDate: jsonDoc.carpoolDate,
      });
      if (res.data) {
        setCarpool(res.data);
      } else {
        console.log("카풀 게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    };
  }, []);

  const deleteCarpool = async () => {
    const carpool = {
      carpoolNo: carpoolNo,
    };
    const res = await deleteCarpoolDB(carpool);
    console.log(res.data);
    alert("게시글 삭제 완료");
    navigate("/carpool");
  };

  return (
    <div>
      <Sidebar />
      <div className="center">
        <Header />
        <br />
        <h2>게시글 훔쳐봐야지? 가야지?</h2>
        <FormDiv style={{ width: "98%", margin: "10px" }}>
          <div>
            <form method="post">
              <input type="hidden" name="carpoolNo" value="" />
              <div>
                <label>제목</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolTitle"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.carpoolTitle}
                </span>
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolMemId"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.carpoolMemId}
                </span>
              </div>

              <div>
                <label>날짜</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolDate"
                  required
                  className="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.carpoolDate}
                </span>
              </div>

              <div>
                <label>내용</label>
                <span
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                  }}
                  type="html"
                  name="carpoolContent"
                  required
                  rows="10"
                  className="form-control"
                  id="exampleTextarea"
                >
                  {carpool.carpoolContent}
                </span>
              </div>

              <div>
                <label className="form-block">첨부파일</label>
                <input
                  style={{ width: "98%", margin: "10px" }}
                  type="file"
                  name="attach"
                  accept="image/*"
                  multiple="multiple"
                  className="form-control"
                />
              </div>

              <div
                style={{
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                  width: "98%",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LandingPage />
              </div>

            </form>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={() => navigate("/carpool")}
            >
              목록으로
            </Button>
            &nbsp;
            <Button
              style={{ margin: "10px", backgroundColor: "black" }}
              onClick={deleteCarpool}
            >
              삭제하자
            </Button>
            {/* <Button style={{ margin: "10px" }} onClick={() =>navigate({
                    pathname: "/together/BoardDetail/"+board.boardTgNo,
                    state:{board}})}> */}
            <Button
              style={{ marginLeft: "10px", backgroundColor: "black" }}
              onClick={() =>
                navigate({
                  pathname: "/carpool/CarpoolUpdate/" + carpool.carpoolNo,
                  state: { carpool },
                })
              }
            >
              수정하자
            </Button>
          </div>
        </FormDiv>
      </div>
    </div>
  );
};

export default CarpoolDetail;
