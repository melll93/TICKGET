import axios from 'axios';
import React, { useState } from 'react'
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { memberPofileImageUpdateDB } from '../../axios/member/member';
import { BlackBtn, MButton } from '../../styles/formStyle';


const Tab4_ProfileChange = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); //유저 정보
  console.log(_userData)

   let member_nickname;
   if (_userData) {
     member_nickname = _userData.memberNickname; //쿠키에서 가져온 회원번호 (내정보)
   }
 console.log(member_nickname)

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
      console.log(error);
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
    <div style={{textAlign:'center', marginTop:'100px'}}>
      <p style={{fontWeight:'bold', fontSize:'2.0rem'}}>&nbsp;<span style={{color:'rgb(50,50,120)'}}>'{member_nickname}'</span> 님의 프로필 사진</p> 
      {_userData&&<img src={_userData.memberProfileImage} alt="uploaded image" style={{borderRadius:'50%', width:'200px', height:'200px' }} />} 
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
      <input style={{width:'220px'}} type="file" onChange={(e)=>{handleFileInput(e.target.files[0])}} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
      <MButton onClick={handleUpload}>변경 확인</MButton>
      <MButton onClick={profileImageUpdate} style={{ marginLeft: '10px' }}>수정 완료</MButton>
    </div>
  </div>
</>
  )
}
export default Tab4_ProfileChange
