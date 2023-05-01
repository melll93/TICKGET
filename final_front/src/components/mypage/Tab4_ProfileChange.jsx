import axios from 'axios';
import React, { useState } from 'react'
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { memberPofileImageUpdateDB } from '../../axios/member/member';
import { BlackBtn } from '../../styles/formStyle';

const Tab4_ProfileChange = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)
  const navigate = useNavigate();

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
      Swal.fire({
        title:error,
        icon:'warning'
      })
    }
  };
 


/* UPDATE */
const profileImageUpdate = async() => {
  if(imageURL!=null && imageURL!=""){

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
        icon:'warning'
      })
    }
    navigate('/');
  }else{
    Swal.fire({
      title:'선택된 사진이 없습니다.',
      icon:'warning'
    }) 
  }
};


  return (
    <>

   <div className="cloudinary_image">

    <div style={{border:'1px solid red'}}>
        기존 프로필 
        {_userData&&<img src={_userData.memberProfileImage} alt="uploaded image" style={{borderRadius:'50%', width:'100px', height:'100px' }} />} 
    </div>
      
      <div>
        <input style={{width:'220px'}} type="file" onChange={(e)=>{handleFileInput(e.target.files[0])}} />
        <BlackBtn onClick={handleUpload}>선택완료=▷</BlackBtn>
     {imageURL && <img src={imageURL} alt="uploaded image" style={{borderRadius:'50%', width:'100px', height:'100px' }} />} 
      </div>
        
        <div style={{textAlign:'center'}}>
        <BlackBtn onClick={profileImageUpdate}> 프사 변경 완료 </BlackBtn>
        </div>
        
      </div>
    </>
  )
}
export default Tab4_ProfileChange
