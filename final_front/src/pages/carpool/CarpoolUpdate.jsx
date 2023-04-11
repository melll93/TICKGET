import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FormDiv } from "../../styles/formStyle";
import { CarpoolDetailDB, updateCarpoolDB } from "../../axios/carpool/CarpoolLogic";

const CarpoolUpdate = () => {
  const navigate = useNavigate();
  const { carpoolNo } = useParams();
  const [carpoolTitle, setCarpoolTitle] = useState(""); //사용자가 입력한 내용 담기
  const [carpoolDate, setCarpoolDate] = useState(""); //사용자가 입력한 내용 담기
  const [carpoolContent, setCarpoolContent] = useState(""); //사용자가 입력한 내용 담기

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
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      console.log("asda = ", jsonDoc);
      setCarpool({
        carpoolNo: jsonDoc.carpoolNo,
        carpoolMemId: jsonDoc.carpoolMemId,
        carpoolTitle: jsonDoc.carpoolTitle,
        carpoolContent: jsonDoc.carpoolContent,
        carpoolDate: jsonDoc.carpoolDate,
      });
      if (res.data) {
        console.log(jsonDoc);
        setCarpool(res.data);
      } else {
        console.log("게시글 조회 실패");
      }
    };

    asyncDB();
    return () => {};
  }, []);

  const updateCarpool = async () => {
    if (!carpoolTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!carpoolDate) {
      alert("날짜를 입력해 주세요.");
      return;
    }

    if (!carpoolContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    const carpool = {
      carpoolNo: carpoolNo, // 게시글 번호
      carpoolTitle: carpoolTitle, // 제목 추가
      carpoolContent: carpoolContent, // 내용 추가
      carpoolDate: carpoolDate,
    };

    console.log("carpool = ", JSON.stringify(carpool));
    try {
      const res = await updateCarpoolDB(carpool);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    alert("게시글 수정 완료");
    navigate("/carpool");
  };

  const handleTitle = useCallback((e) => {
    setCarpoolTitle(e);
  }, []);

  const handleDate = (date) => {
    // "YYYY-MM-DD" 형식이 아닐 경우 에러 처리
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }
    // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    // 변환된 값을 상태 변수에 저장
    setCarpoolDate(formattedDate);
    // setDate();
  };

  const handleContent = useCallback((e) => {
    setCarpoolContent(e);
  }, []);

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
              <div>
                <label>수정 할 제목</label>
                <br />
                <input
                  id="carpool_title"
                  type="text"
                  maxLength="50"
                  value={carpoolTitle}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 제목을 입력해 주세요"
                  onChange={(e) => {
                    handleTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>작성자</label>
                <span
                  style={{ width: "98%", margin: "10px" }}
                  type="text"
                  name="carpoolMemId"
                  required
                  class="form-control form-control-lg"
                  id="inputLarge"
                >
                  {carpool.carpoolMemId}
                </span>
              </div>

              <div>
                <label>수정된 날짜</label>
                <br />
                <input
                  id="carpool_tg_date"
                  type="date"
                  maxLength="50"
                  value={carpoolDate}
                  style={{
                    width: "98%",
                    height: "40px",
                    margin: "10px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder={
                    "YYYY-MM-DD 형식으로 입력해주세요. ex) : " +
                    new Date().toISOString().substr(0, 10)
                  }
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>수정할 내용</label>
                <br />
                <textarea
                  id="carpool_tg_date"
                  type="text"
                  maxLength="50"
                  value={carpoolContent}
                  style={{
                    width: "98%",
                    margin: "10px",
                    height: "300px",
                    fontSize: "20px",
                    border: "1px solid lightGray",
                    borderRadius: "10px",
                  }}
                  placeholder="수정할 내용을 입력해 주세요"
                  onChange={(e) => {
                    handleContent(e.target.value);
                  }}
                />
              </div>

              <div>
                <label class="form-block">첨부파일</label>
                <input
                  style={{ width: "98%", margin: "10px" }}
                  type="file"
                  name="attach"
                  accept="image/*"
                  multiple="multiple"
                  class="form-control"
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    updateCarpool();
                  }}
                >
                  수정하기
                </Button>
                <Button
                  style={{ marginLeft: "10px", backgroundColor: "black" }}
                  onClick={() => {
                    if (window.confirm("정말 돌아가시겠습니까?")) {
                      navigate({
                        pathname: "/carpool/carpoolDetail/" + carpool.carpoolNo,
                        state: { carpool },
                      });
                    }
                  }}
                >
                  돌아가기
                </Button>
              </div>
            </form>
          </div>
        </FormDiv>
      </div>
    </div>
  );
};

export default CarpoolUpdate;