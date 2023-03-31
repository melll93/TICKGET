//상품등록 페이지 - 은영 - 수정중

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router'
import { FestivalInsertDB } from '../../axios/main/Festival';





/* ========================= 상품 자체 등록 ============================ */         




const AddProducts = () => {

const navigate = useNavigate();
const[festTitle, setFesttitle] = useState("")
const[festLocation, setFestloc] = useState("")
const[festCategory, setFestcate] = useState("")
const[festStartday, setFeststart] = useState("")
const[festEndday, setFestend] = useState("")
const[festDetail, setFestdetail] = useState("")
const[festPrice, setFestprice] = useState("")
const[festDesc, setFestdesc] = useState("")
const [festImages, setFestImages] = useState("");
const [festImageUrl, setFestImageUrl] = useState(null);
const imgRef = useRef();


const festivalInsert=async()=>{
  const festival={
    festTitle,
    festLocation,
    festCategory,
    festStartday,
    festEndday,
    festDetail,
    festPrice,
    festDesc,
    festImageUrl
    }
    const res =await FestivalInsertDB(festival)
    console.log(festival)
    if(!res.data){
    }
    else{
      inputFestUrl()
      FestImageUpload()
      navigate("/festival")
    }
}


const inuptTitle = useCallback((e) => {
  setFesttitle (e)
},[])
    const inputLocation = useCallback((e) => {
      setFestloc(e)
    },[])
    const inputCategory = useCallback((e) => {
      setFestcate(e)
    },[])
    const inputStartday = useCallback((e) => {
      setFeststart(e)
    },[])
    const inputEndday = useCallback((e) => {
      setFestend (e)
    },[])
    const inputDetail = useCallback((e) => {
      setFestdetail (e)
    },[])  
    const inputPrice = useCallback((e) => {
      setFestprice (e)
    },[])
    const inputDesc = useCallback((e) => {
      setFestdesc (e)
    },[])
    const inputFestUrl = useCallback((e) => {
      setFestImageUrl (e)
    },[])


    

//선택파일 이미지로 교체
    const festImage=()=>{
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setFestImages(reader.result);
      }
  }


//클라우디너리에 업로드
  const FestImageUpload = () => {
    const { files } = document.querySelector('#festivalsImg');
    const imageFile = document.querySelector('#festivalsImg');
    const filesa = imageFile.files;
    console.log("Image file", filesa[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "dpa186u8");// "본인 프리셋 업로드 네임"
    const options = {
      method: "POST",
      body: formData,
    };
    return fetch(
      "https://api.Cloudinary.com/v1_1/djxfvm2ev/image/upload",options)
      //"https://api.Cloudinary.com/v1_1/본인 클라우드 네임/image/upload"
      .then((res) => res.json())
      .then((res) => {
        setFestImageUrl(res.secure_url);
        console.log(res.secure_url)
      })
      .catch((err) => console.log(err));
  };






  return (
    <>
<div style={{ textAlign:'center', width:'600px', marginLeft:'100px'}}><br/> {/* //등록 div 시작 */}

<select className="form-select" id="fest_category" aria-label="Default select example" style={{width:'150px'}}  onChange={(e)=>{inputCategory (e.target.value)}}>
  <option  defaultValue disabled>카테고리</option>
  <option  value="FESTIVAL"  >FESTIVAL</option>
  <option  value="CONCERT"  >CONCERT</option>
</select><br/>

<h2>상품 자체 등록</h2>
<div id="uploadImg">
          <img id="festivalImgChange" className='thumbNail' src={festImages? festImages:`https://via.placeholder.com/400x300/D9D9D9/979892.png?text=image+upload`} alt="미리보기" />
        {/* - 가로x세로/배경색/글자색.확장자?text=텍스트(공백은+로) */}
        </div><br/>
 <input className="form-control" type="file" accept='image/*' id="festivalsImg" onChange={festImage} ref={imgRef}/> <br/>
 <div className="form-floating mb-3">
  <input type="text" className="form-control" id="festTitle" onChange={(e)=>{inuptTitle(e.target.value)}} />
  <label htmlFor="floatingInput"> festTitle </label>
</div>
<div className="form-floating mb-3">
  <input type="text" className="form-control" id="festDesc" onChange={(e)=>{inputDesc  (e.target.value)}}/>
  <label htmlFor="floatingInput"> desc </label>
</div>
<div className="form-floating">
  <input type="text" className="form-control" id="festLocation"onChange={(e)=>{inputLocation (e.target.value)}} />
  <label htmlFor="floatingInput">location</label>
</div><br />
<div className="form-floating">
  <input type="number" className="form-control" id="festPrice" name="price" onChange={(e)=>{inputPrice (e.target.value)}}/>
  <label htmlFor="floatingInput">price</label>
</div><br />
<div className="form-floating mb-3">
  <input type="date" className="form-control" id="festStartday" name="startDay" onChange={(e)=>{inputStartday (e.target.value)}}/>
  <label htmlFor="floatingInput"> 행사시작일 </label>
</div>
<div className="form-floating mb-3">
  <input type="date" className="form-control" id="festEndday" name="startDay" onChange={(e)=>{inputEndday (e.target.value)}}/>
  <label htmlFor="floatingInput"> 행사종료일 </label>
</div>
 <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="festDetail" style={{height: '300px',}} onChange={(e)=>{inputDetail (e.target.value)}}></textarea>
  <label htmlFor="floatingTextarea2">상세내용</label>
</div><br/>
<button type="button" className="btn btn-dark" onClick={()=>{navigate(-1)}}>취소</button>&nbsp;
<button type="button" className="btn btn-dark" onClick={festivalInsert}>상품등록하기</button>
</div>  {/* //등록 div 끝 */}
    </>
  )
}
/* ========================= 상품등록  끝 ============================ */






const AddProductsPage = () => {
  return (
    <>
      <Sidebar />
      <div className='center'>
        <Header />
        상품등록페이지
        <AddProducts />
      </div>
    </>
  )
}

export default AddProductsPage
