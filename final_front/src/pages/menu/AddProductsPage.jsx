//상품등록 페이지 - 은영 - 수정중

import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router";
import { FestivalInsertDB, FetivalDetailDB, festivalUpdateDB } from "../../axios/festival/festival";
import ImageUploader from "../../util/imageUploader";
import AddProductsOptionalDetail from "../festival/AddProductsOptionalDetail";
import { Button } from "react-bootstrap";
import { BlackBtn } from "../../styles/formStyle";
import Swal from "sweetalert2";


/* ========================= 상품 자체 등록 ============================ */

const AddProducts = () => {
  const navigate = useNavigate();
  const {festMId}=useParams();

 /*  console.log(festMId) */
  const [festTitle, setFesttitle] = useState();
  const [festLocation, setFestloc] = useState();
  const [festCategory, setFestcate] = useState();
  const [festStartday, setFeststart] = useState();
  const [festEndday, setFestend] = useState();
  const [festDetail, setFestdetail] = useState();
  const [festPrice, setFestprice] = useState();
  const [festDesc, setFestdesc] = useState();
  const [festArea, setFestArea] = useState();
  const [festImages, setFestImages] = useState();
  const [festImageUrl, setFestImageUrl] = useState();
  const imgRef = useRef();

  const [festPsUrl, setFestPsUrl] = useState();
  const [festPsNo, setFestPsNo] = useState();


  const [festDtCrew, setFestDtCrew] = useState();
  const [festDtCasting, setFestDtCasting] = useState();
  const [festDtRuntime, setFestDtRuntime] = useState();
  const [festDtAge, setFestDtAge] = useState();

  const [festTcType, setFestTcType] =useState();
  const [festTcPrice, setFestTcPrice] =useState();
  const [festTcTime, setFestTcTime]= useState();
  const [festTcNo, setFestTcNo]= useState();




  /* 추가정보입력 띄우기 */
  const [optionModal, setOptionModal] = useState(0);
  const optionModalOpen = () => {if (optionModal === 0) {setOptionModal(1);
    } else {setOptionModal(0);}};

  /* 상품등록 insert */
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
/*     console.log(festival); */
    if (!res.data) {
    } else {
      navigate("/festival");
    }
  };



/* 입력되어있던 정보 가져오기 */  
useEffect(() => {
const originDetail=async()=>{
  const festival={
    festMId,
  }
  const res = await FetivalDetailDB(festival);
  const temp = JSON.stringify(res.data)  //문자열 전환
  const jsonDoc=JSON.parse(temp)  //배열로 접근처리
  setFesttitle(jsonDoc[0].festMName)
  setFeststart(jsonDoc[0].festMStart )
setFestend(jsonDoc[0].festMEnd)
setFestloc(jsonDoc[0].festMLoc)
setFestcate(jsonDoc[0].festMGenre)
setFestdetail(jsonDoc[0].festDetail)   //아직 사용 안하는중
setFestArea(jsonDoc[0].festMArea)
setFestImageUrl(jsonDoc[0].festMImg)

setFestDtRuntime(jsonDoc[0].festDtRuntime)
setFestDtAge(jsonDoc[0].festDtAge)
setFestDtCasting(jsonDoc[0].festDtCasting)
setFestDtCrew(jsonDoc[0].festDtCrew)


const festPsUrlAll = jsonDoc.map(item => item.festPsUrl);
setFestPsUrl(festPsUrlAll);
const festPsNoAll = jsonDoc.map(item => item.festPsNo);
setFestPsNo(festPsNoAll);

const festTcNoAll = jsonDoc.map(item => item.festTcNo);
setFestTcNo(festTcNoAll);

const festTcTypeAll = jsonDoc.map(item => item.festTcType);
setFestTcType(festTcTypeAll);

const festTcPriceAll = jsonDoc.map(item => item.festTcPrice);
setFestTcPrice(festTcPriceAll);

const festTcTimeAll = jsonDoc.map(item => item.festTcTime);
setFestTcTime(festTcTimeAll);


/* if(jsonDoc[0].MEM_NO!==sessionStorage.getItem("no")){  //글의 회원번호와 로그인한 no가 달라?  네 -> 다른 사람 글
return console.log('작성자가 아닙니다.')
} */
}
originDetail()
},[
/*   festMId,  */
/*   festPsUrl */
]);


    const festivalUpdate = async() => {
      const festival={
      festMId,
      festMName: festTitle,
      festMLoc: festLocation,
      festMGenre: festCategory,
      festMStart: festStartday,
      festMEnd: festEndday,
      festMArea: festArea,
      festMImg: festImageUrl,
      }   
      try {
      const res = await festivalUpdateDB(festival)
/*         console.log(res.data); */
        navigate("/festival")
        /* alert('상품수정완료') */
        Swal.fire({
          title:'상품 수정 완료',
          icon:'success'
          })
          
      } catch (error) {
        console.log(error);
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
   /*        console.log(res.secure_url); */
          const festImageUrl = res.secure_url;
          localStorage.setItem("imageUrl", festImageUrl);
/*           console.log("페스트 이미지 유알엘 : " + festImageUrl); */
          setFestImageUrl(festImageUrl);
        })
        .catch((err) => console.log(err))
    );
  };

  return (
    <>
      <div
        className="addproductstotalDiv"
        style={{ textAlign: "center", width: "900px", marginLeft: "25%" }}
      >
        <br /> {/* //등록 div 시작 */}
        <select
          defaultValue="1"
          className="form-select"
          id="fest_category"
          aria-label="Default select example"
          style={{ width: "150px" }}
          value={festCategory}
          onChange={(e) => {
            inputCategory(e.target.value);
          }}
        >
          <option value="1" disabled>
            카테고리
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
            style={{width:'60%'}}
              src={festImageUrl ? festImageUrl : "https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload"}
              alt="Festival Image"
   /*            festImages
                ? festImages
                : `https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload` */
           /*  }
            alt="미리보기" */
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
          defaultValue={festTitle}
            onChange={(e) => {
              inuptTitle(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> festTitle </label>
        </div>
        <select
          className="form-select"
          id="festArea"
          aria-label="Default select example"
          style={{ width: "150px" }}
          value={festArea}
          onChange={(e) => {
            inputArea(e.target.value);
          }}
        >
          <option disabled value="">
            지역
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
            defaultValue={festLocation}
            onChange={(e) => {
              inputLocation(e.target.value);
            }}
          />
          <label htmlFor="floatingInput">location</label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="festStartday"
            name="startDay"
            defaultValue={festStartday}
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
            defaultValue={festEndday}
            onChange={(e) => {
              inputEndday(e.target.value);
            }}
          />
          <label htmlFor="floatingInput"> 행사종료일</label>
        </div>
        <br />
        {/* 추가 정보 입력 */}
        <BlackBtn onClick={optionModalOpen}>
          {" "}
          판매 추가정보 입력 (추후기재가능)
        </BlackBtn>
        {optionModal === 1 ? <AddProductsOptionalDetail  festTcNo={festTcNo} setFestOriginPsUrl={setFestPsUrl} festPsNo={festPsNo} festOrginPsUrl={festPsUrl} festDtAge={festDtAge} festDtCasting={festDtCasting} festDtCrew={festDtCrew} festDtRuntime={festDtRuntime} festTcType={festTcType} festTcPrice={festTcPrice} festTcTime={festTcTime}/> : null}
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
        {festMId==='new'? <BlackBtn onClick={festivalInsert}>상품등록하기</BlackBtn> : <BlackBtn onClick={festivalUpdate}>상품수정완료</BlackBtn>}
      </div>
      {/* //등록 div 끝 */}
    </>
  );
};
/* ========================= 상품등록  끝 ============================ */

const AddProductsPage = () => {
  return (
    <>
        <Header />
      <Sidebar />
      <div className="center">
        <AddProducts />
      </div>
    </>
  );
};

export default AddProductsPage;
