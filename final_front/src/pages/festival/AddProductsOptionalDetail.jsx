import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { saveFestDetailDB, saveFestPsUrlDB } from '../../axios/festival/festival';
import "../../styles/festivaldetails.css";
import { BlackBtn } from '../../styles/formStyle';
import AddProductsFestTicketDetail from './AddProductsFestTicketDetail';

import Swal from "sweetalert2";

const AddProductsOptionalDetail = () => {
  const {festMId}=useParams();
  console.log(festMId)

  const[festDetailCasting, setFestDetailCasting] = useState("")
  const[festDetailCrew, setFestDetailCrew] = useState("")
  const[festDetailRuntime, setFestDetailRuntime] = useState(0)
  const[festDetailAge, setFestDetailAge] = useState(0)

  const[festPsUrl, setFestPsUrl] = useState()
  const imgRef = useRef()



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
  console.log(festival);
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


/* fest_poster */
const saveFestPoster=async()=>{
  const festival = {
    festMId,
    festPsUrl,
};
try {
const res = await saveFestPsUrlDB(festival);
console.log(festival);
alert('임시저장완료')
if (!res.data) {
} else {
}
} catch (error) {
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
    <BlackBtn onClick={()=>{/* alert('update 아직 안함') */
    Swal.fire({
    title:'수정 완료',
    icon:'success'
})}}>수정완료</BlackBtn>

    <div className="form-floating">
  <input type="text" className="form-control" id="festDetailCasting"onChange={(e)=>{inputCasting (e.target.value)}} />
  <label htmlFor="floatingInput">캐스팅정보</label>
</div><br />
<div className="form-floating">
  <input type="text" className="form-control" id="festDetailCrew"onChange={(e)=>{inputCrew (e.target.value)}} />
  <label htmlFor="floatingInput">제작진정보</label>
</div><br />
<div className="form-floating" style={{display:'flex'}}>
  <input type="number" className="form-control" id="festDetailRuntime" onChange={(e)=>{inputRuntime (e.target.value)}} style={{width:'150px', flex:'1'}}/>
  <label htmlFor="floatingInput">runtime</label><h3>분</h3>&nbsp;&nbsp;&nbsp;&nbsp;<h3>만</h3>
  <div className="form-floating"></div>
  <input type="number" className="form-control" id="festDetailCrew"onChange={(e)=>{inputAge (e.target.value)}} style={{width:'150px', flex:'1'}} />
  <h3>세 이상</h3>

</div><br />
</div>

{/* fest_poster */}

<h1 style={{borderBottom:'1px solid lightgray', marginTop:'30px', color:'darkgray'}}>
fest_poster 추가 정보 입력
<BlackBtn onClick={saveFestPoster}>임시저장</BlackBtn>

    </h1>
    파일 상세이미지 업로드
            <input
          className="form-control"
          type="file"
          accept="image/*"
          id="festivalPoster"
          onChange={FestImageUpload}
          ref={imgRef}
        />




{/* fest_ticket */}
<AddProductsFestTicketDetail></AddProductsFestTicketDetail>


    </>
  )
}

export default AddProductsOptionalDetail
