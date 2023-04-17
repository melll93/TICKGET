/* 은영 수정중  - 리뷰 컴포로 쪼개는중 */
import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteFestReviewDB,
  FestivalReviewDB,
  FestReviewInsertDB,
  UpdateFestReviewDB,
} from "../../axios/main/Festival";
import { BButton } from "../../styles/formStyle";

const FestivalReviewComponent = () => {
  let { festMId } = useParams();
  const navigate = useNavigate();
  const [freviews, setFreviews] = useState([]);
  const [reviewRevisedContent, setReviewRevisedContent] = useState("");
  const [lgShow, setLgShow] = useState(false);
  /* 리뷰 */
  const [reviewContent, setReviewContent] = useState("");

  const inputReviewContent = useCallback((e) => {
    setReviewContent(e);
  }, []);

  /* 리뷰 인서트 요기  */
  const insertReview = async () => {
    const freview = {
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
  };

  /* 리뷰 작성 textarea clear */
  const resetReviewField = () => {
    setReviewContent("");
    document.querySelector("#product_detail_review_textarea").value = null;
  };

  const inputReviewRevisedContent = useCallback((e) => {
    setReviewRevisedContent(e);
    console.log(e.value);
  }, []);
  useEffect(() => {
    FestivalReviewDB().then(setFreviews);
  }, []);
  const click = () => {
    setLgShow(true);
  };

  return (
    <>
      <section
        className="product_detail_review"
        style={{
          maxWidth: "1250px",
          height: "1000px",
          border: "1px solid red",
        }}
      >
        <div
          className="product_detail_review_heading"
          style={{ margin: "50px", borderBottom: "1px solid black" }}
        >
          <h3>관람 후기</h3>
        </div>
        <div className="form-floating" style={{ textAlign: "right" }}>
          <textarea
            onChange={(e) => {
              inputReviewContent(e.target.value);
            }}
            className="form-control"
            placeholder="Leave a comment here"
            id="product_detail_review_textarea"
            style={{ height: "300px", margin: "10px", maxWidth: "1200px" }}
          ></textarea>
          <label htmlFor="floatingTextarea">관람후기</label>
          <button
            className="reviewbtn"
            onClick={insertReview}
            style={{
              backgroundColor: "black",
              width: "250px",
              height: "50px",
              color: "white",
              margin: "10px 80px 10px 10px",
              borderRadius: "10px",
            }}
          >
            {" "}
            등록{" "}
          </button>
        </div>

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
                  id: {review.reviewMemid} 등록일시: {review.reviewRegdate}
                  리뷰번호: {review.reviewNo}
                  {/* test_ reviewNo: {review.reviewNo} */}
                  {
                    //로그인 작업 후 하단 주석 해제 예정 , session에 로그인한 사람과 작성자 일치 시 수정, 삭제 버튼 보이기
                    // sessionStorage.getItem('Member_name')==='Member_name(작성자)'&&
                    <div>
                      <BButton
                        style={{ width: "80px", height: "38px" }}
                        onClick={click}
                      >
                        수정
                      </BButton>

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
                                height: "300px",
                                margin: "10px",
                                maxWidth: "1200px",
                              }}
                            ></textarea>
                            <button
                              className="reviseBtn"
                              onClick={async () => {
                                const freview = {
                                  reviewNo: review.reviewNo,
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
                                    review.reviewNo
                                );
                                console.log("리뷰번호" + review.reviewNo);
                              }}
                            >
                              ddddd{" "}
                            </button>
                          </div>
                          <br />
                        </Modal.Body>
                      </Modal>
                      {/* //////   리뷰 수정용 모달    여기까지///////*/}

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
                  }
                </div>
              ); //안쪽리턴
            }
          })}
      </section>
    </>
  ); //리턴끝
}; //ReviewList 끝

export default FestivalReviewComponent;

