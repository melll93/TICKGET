import axios from 'axios';
import React, { useState } from 'react'
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { memberPofileImageUpdateDB } from '../../axios/member/member';
import { BlackBtn } from '../../styles/formStyle';

const Tab4_ProfileChange = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileInput = (e) => {
    console.log(e);
    setSelectedFile(e);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(
        "http://localhost:8888/api/image-upload",
        formData
      );
      setImageURL(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 


/* UPDATE */
const profileImageUpdate = async() => {
  const member={
    memberId:_userData.memberId,
    memberProfileImage:imageURL
  }   
  try {
  const res = await memberPofileImageUpdateDB(member)
    Swal.fire({
      title:'프로필 사진 변경 완료',
      icon:'success'
      })
  } catch (error) {
    Swal.fire({
      title:error,
      icon:'success'
      })
  }
};


  return (
    <>

   <div className="cloudinary_image">
        <input type="file" onChange={(e)=>{handleFileInput(e.target.files[0])}} />
        <BlackBtn onClick={handleUpload}>프로필 이미지 변경</BlackBtn>
     {imageURL && <img src={imageURL} alt="uploaded image" style={{borderRadius:'50%', width:'100px', height:'100px' }} />} 
        
        <BlackBtn onClick={profileImageUpdate}> 완료 </BlackBtn>
      </div>
    </>
  )
}
export default Tab4_ProfileChange
