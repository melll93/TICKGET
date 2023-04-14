//상품등록 페이지 - 은영 - 수정중

import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router";
import { FestivalInsertDB } from "../../axios/festival/festival";
import ImageUploader from "../../util/imageUploader";
import AddProductsOptionalDetail from "../festival/AddProductsOptionalDetail";
import { Button } from "react-bootstrap";
import { BlackBtn } from "../../styles/formStyle";

/* ========================= 상품 자체 등록 ============================ */

const AddProducts = () => {
  const navigate = useNavigate();
  const [festTitle, setFesttitle] = useState("");
  const [festLocation, setFestloc] = useState("");
  const [festCategory, setFestcate] = useState("");
  const [festStartday, setFeststart] = useState("");
  const [festEndday, setFestend] = useState("");
  const [festDetail, setFestdetail] = useState("");
  const [festPrice, setFestprice] = useState("");
  const [festDesc, setFestdesc] = useState("");
  const [festArea, setFestArea] = useState("");
  const [festImages, setFestImages] = useState("");
  const [festImageUrl, setFestImageUrl] = useState("");
  const imgRef = useRef();

  const [optionModal, setOptionModal] = useState(0);
  const optionModalOpen = () => {
    if (optionModal === 0) {
      setOptionModal(1);
    } else {
      setOptionModal(0);
    }
  };

  const festivalInsert = async () => {
    const festival = {
      festMName: festTitle,
      festMLoc: festLocation,
      festMGenre: festCategory,
      festMStart: festStartday,
      festMEnd: festEndday,
      festDetail,
      festPrice,
      festDesc,
      festMArea: festArea,
      festMImg: festImageUrl,
    };
    const res = await FestivalInsertDB(festival);
    console.log(festival);
    if (!res.data) {
    } else {
      navigate("/festival");
    }
  };

  const inuptTitle = useCallback((e) => {
    setFesttitle(e);
  }, []);
  const inputLocation = useCallback((e) => {
    setFestloc(e);
  }, []);
  const inputCategory = useCallback((e) => {
    setFestcate(e);
  }, []);
  const inputStartday = useCallback((e) => {
    setFeststart(e);
  }, []);
  const inputEndday = useCallback((e) => {
    setFestend(e);
  }, []);
  const inputDetail = useCallback((e) => {
    setFestdetail(e);
  }, []);
  const inputPrice = useCallback((e) => {
    setFestprice(e);
  }, []);
  const inputDesc = useCallback((e) => {
    setFestdesc(e);
  }, []);
  const inputArea = useCallback((e) => {
    setFestArea(e);
  }, []);

  //선택파일 이미지로 교체
  const festImage = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFestImages(reader.result);
    };
  };

  //클라우디너리에 업로드
  const FestImageUpload = (e) => {
    festImage();
    const { files } = document.querySelector("#festivalsImg");
    const imageFile = document.querySelector("#festivalsImg");
    const filesa = imageFile.files;
    console.log("Image file", filesa[0]);
    const formData = new FormData();
    setFestImageUrl(festImageUrl);
    formData.append("file", files[0]);
    formData.append("upload_preset", "dpa186u8"); // "본인 프리셋 업로드 네임"
    const options = {
      method: "POST",
      body: formData,
    };
    return (
      fetch("https://api.Cloudinary.com/v1_1/djxfvm2ev/image/upload", options)
        //"https://api.Cloudinary.com/v1_1/본인 클라우드 네임/image/upload"
        .then((res) => res.json())
        .then((res) => {
          console.log(res.secure_url);
          const festImageUrl = res.secure_url;
          localStorage.setItem("imageUrl", festImageUrl);
          console.log("페스트 이미지 유알엘 : " + festImageUrl);
          setFestImageUrl(festImageUrl);
        })
        .catch((err) => console.log(err))
    );
  };

  return (
    <>
      <div
        className="addproductstotalDiv"
        style={{ textAlign: "center", width: "600px", marginLeft: "25%" }}
      >
        <br /> {/* //등록 div 시작 */}
        <select
          defaultValue="1"
          className="form-select"
          id="fest_category"
          aria-label="Default select example"
          style={{ width: "150px" }}
          onChange={(e) => {
            inputCategory(e.target.value);
          }}
        >
          <option value="1" disabled>
            카테고리{" "}
          </option>
          <option value="FESTIVAL">FESTIVAL</option>
          <option value="CONCERT">CONCERT</option>
        </select>
        <br />
        <h2>상품 자체 등록</h2>
        <div id="uploadImg">
          <img
            id="festivalImgChange"
            className="thumbNail"
            src={
              festImages
                ? festImages
                : `https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload`
            }
            alt="미리보기"
          />
          {/* - 가로x세로/배경색/글자색.확장자?text=텍스트(공백은+로) */}
        </div>
        <br />
        <input
          className="form-control"
          type="file"
          accept="image/*"
          id="festivalsImg"
          onChange={FestImageUpload}
          ref={imgRef}
        />{" "}
        <br />
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="festTitle"
            onChange={(e) => {
              inuptTitle(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> festTitle </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="festDesc"
            onChange={(e) => {
              inputDesc(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> desc </label>
        </div>
        <select
          defaultValue=""
          className="form-select"
          id="festArea"
          aria-label="Default select example"
          style={{ width: "150px" }}
          onChange={(e) => {
            inputArea(e.target.value);
          }}
        >
          <option disabled value="">
            지역{" "}
          </option>
          <option value="서울">서울</option>
          <option value="경기/인천">경기/인천</option>
          <option value="충청/강원">충청/강원</option>
          <option value="대구/경북">대구/경북</option>
          <option value="부산/경남">부산/경남</option>
          <option value="광주/전라">광주/전라</option>
          <option value="제주">제주</option>
        </select>
        <br />
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="festLocation"
            onChange={(e) => {
              inputLocation(e.target.value);
            }}
          />
          <label htmlFor="floatingInput">location</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="festPrice"
            name="price"
            onChange={(e) => {
              inputPrice(e.target.value);
            }}
          />
          <label htmlFor="floatingInput">price</label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="festStartday"
            name="startDay"
            onChange={(e) => {
              inputStartday(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> 행사시작일</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="festEndday"
            name="startDay"
            onChange={(e) => {
              inputEndday(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> 행사종료일</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="festDetail"
            style={{ height: "300px" }}
            onChange={(e) => {
              inputDetail(e.target.value);
            }}
          ></textarea>
          <label htmlFor="floatingTextarea2">상세내용</label>
        </div>
        <br />
        {/* 추가 정보 입력 */}
        <BlackBtn onClick={optionModalOpen}>
          {" "}
          판매 추가정보 입력 (추후기재가능)
        </BlackBtn>
        {optionModal === 1 ? <AddProductsOptionalDetail /> : null}
        {/* 추가 정보 입력 */}
        <br />
        <br />
        <BlackBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </BlackBtn>
        &nbsp;
        <BlackBtn onClick={festivalInsert}>상품등록하기</BlackBtn>
      </div>{" "}
      {/* //등록 div 끝 */}
    </>
  );
};
/* ========================= 상품등록  끝 ============================ */

const AddProductsPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <AddProducts />
      </div>
    </>
  );
};

export default AddProductsPage;
