import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFestPosterDB, festivalDetailUpdateDB, saveFestDetailDB, saveFestPsUrlDB } from '../../axios/festival/festival';
import "../../styles/festivaldetails.css";
import { BlackBtn } from '../../styles/formStyle';
import AddProductsFestTicketDetail from './AddProductsFestTicketDetail';

import Swal from "sweetalert2";

const AddProductsOptionalDetail = ({ festTcNo, setFestOriginPsUrl, festPsNo, festOrginPsUrl, festDtCrew, festDtCasting, festDtAge, festDtRuntime, festTcType, festTcPrice, festTcTime}) => {
  const navigate = useNavigate();
  const {festMId}=useParams();
/*    console.log(festMId)  */
/*   console.log(festTcType); 
console.log(festTcTime); */
/* console.log(festPsNo); */
/* console.log(festOrginPsUrl); */
  const[festDetailCasting, setFestDetailCasting] = useState()
  const[festDetailCrew, setFestDetailCrew] = useState()
  const[festDetailRuntime, setFestDetailRuntime] = useState(0)
  const[festDetailAge, setFestDetailAge] = useState(0)

  const[festPsUrl, setFestPsUrl] = useState()
  const imgRef = useRef()



  /* fest_detail INSERT */
  const saveFestDetail=async()=>{
    const festival = {
      festMId,
      festDtCasting: festDetailCasting,
      festDtCrew: festDetailCrew,
      festDtRuntime: festDetailRuntime,
      festDtAge: festDetailAge,
  };
  try {
  const res = await saveFestDetailDB(festival);
  /*   console.log(festival); */
  if (!res.data) {
  } else {
  }
} catch (error) {
  /* alert('이미 등록된 정보가 있어 수정만 가능합니다.'); */
  Swal.fire({
    title:'이미 등록된 정보가 있어 수정만 가능합니다.',
    icon:'warning'
  })
}

};

      /* fest_detail 추가정보 입력 */
      const inputCasting = useCallback((e) => {
        setFestDetailCasting (e)
      },[])
      const inputCrew= useCallback((e) => {
        setFestDetailCrew (e)
      },[])
      const inputRuntime= useCallback((e) => {
        setFestDetailRuntime (e)
      },[])
      const inputAge= useCallback((e) => {
        setFestDetailAge (e)
      },[])
      
      

/* fest_detail Update  */
const festivalDetailUpdate = async() => {

  const festival={
    festMId,
    festDtCasting: festDetailCasting,
    festDtCrew: festDetailCrew,
    festDtRuntime: festDetailRuntime,
    festDtAge: festDetailAge,
  }   
  try {
    const res = await festivalDetailUpdateDB(festival)
    Swal.fire({
      title:'상품 수정 완료',
      icon:'success'
    })
  } catch (error) {
    console.log(error);
  }
};


/* fest_poster */
const saveFestPoster=async()=>{
  const festival = {
    festMId,
    festPsUrl,
  };
  try {
    const res = await saveFestPsUrlDB(festival);
    const newPsPoster = [...festOrginPsUrl,festival.festPsUrl]
    setFestOriginPsUrl(newPsPoster)
/* console.log(festival); */
alert('추가완료')
if (!res.data) {
} else {
}    
} catch (error) {
}
};





const deleteFestPsUrl = async ({i}) => {
  const festival = {
    fest_ps_no: festPsNo[i],
  };
  const res = await deleteFestPosterDB(festival);
  if (!res.data) {
    const updatedFestPsUrl = festOrginPsUrl.filter((item, index) => index !== i);
    setFestOriginPsUrl(updatedFestPsUrl);
  } else {
    alert("에러")
  }
};




//클라우디너리에 업로드
const FestImageUpload = (e) => {
  const { files } = document.querySelector("#festivalPoster");
  const imageFile = document.querySelector("#festivalPoster");
    const filesa = imageFile.files;
    console.log("Image file", filesa[0]);
    const formData = new FormData();
    setFestPsUrl(festPsUrl);
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
        const festPsUrl = res.secure_url;
          localStorage.setItem("imageUrl", festPsUrl);
          console.log("페스트 이미지 유알엘 : " + festPsUrl);
          setFestPsUrl(festPsUrl);
          
          
        })
        .catch((err) => console.log(err))
        );
      };
      

      
      
      
      
      
      
      return (
        <>
      {/* fest_detail  */}
<div>
    <h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_detail 추가 정보 입력 
    </h1>
    <BlackBtn onClick={saveFestDetail}>임시저장</BlackBtn>
    <BlackBtn onClick={festivalDetailUpdate}>수정완료</BlackBtn>

    <div className="form-floating">
  <input type="text" className="form-control" 
 defaultValue={festDtCasting} 
  id="festDetailCasting"
  onChange={(e) => inputCasting(e.target.value)} 
   />
  <label htmlFor="floatingInput">캐스팅정보</label>
</div><br />
<div className="form-floating">
  <input type="text" className="form-control" 
 defaultValue={festDtCrew} 
  id="festDetailCrew"onChange={(e)=>{inputCrew (e.target.value)}} />
  <label htmlFor="floatingInput">제작진정보</label>
</div><br />


<div style={{display: 'flex'}}>
  <div className="form-floating" style={{flex: 1}}>
    <input type="text" className="form-control" defaultValue={festDtRuntime} id="festDetailRuntime" onChange={(e)=>{inputRuntime (e.target.value)}} />
    <label htmlFor="floatingInput">runtime ('~분'으로 기재해주세요.)</label>
  </div>
  <div className="form-floating" style={{flex: 1, paddingLeft:'5px'}}>
    <input type="text" className="form-control" defaultValue={festDtAge} id="festDetailCrew" onChange={(e)=>{inputAge (e.target.value)}} />
    <label htmlFor="floatingInput">관람등급 ('만 ~세 이상'으로 기재해주세요.)</label>
  </div>
</div>

</div>

{/* fest_poster */}

<h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_poster 추가 정보 입력  </h1>
    <p>
    파일 상세이미지 업로드
    </p> 
<BlackBtn onClick={saveFestPoster}>선택파일 저장</BlackBtn>


            <input
          className="form-control"
          type="file"
          accept="image/*"
          id="festivalPoster"
          onChange={FestImageUpload}
          ref={imgRef}
          />

{festOrginPsUrl && festOrginPsUrl.some(url => url !== null) ? (
  festOrginPsUrl.map((url, i) => (
    url !== null ? (
      <div key={i} style={{ display: 'inline' }}>
        <img key={i} src={url} style={{ width: '50px', height: '100px', overflow: 'hidden', display: 'inline', margin: '5px' }}></img>
        <BlackBtn onClick={() => deleteFestPsUrl({ i })} width='50px' height="10px" style={{ fontSize: '5px' }}>삭제</BlackBtn>
      </div>
    ) : null
  ))
) : null}
            



{/* fest_ticket */}
<AddProductsFestTicketDetail festTcNo={festTcNo} festTcType={festTcType} festTcPrice={festTcPrice} festTcTime={festTcTime}></AddProductsFestTicketDetail>


    </>
  )
}

export default AddProductsOptionalDetail
