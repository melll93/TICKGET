import React from 'react'
import { useState } from 'react';
import { BButton, LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../styles/formStyle';
import { useNavigate } from 'react-router-dom';
import { memberListDB } from '../../axios/member/memberCrud';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Swal from "sweetalert2";


const FindIdPage = () => {

  const [memInfo, setMemInfo] = useState({
    name: "",
    mobile: "",
  });
  const navigate = useNavigate();

  const handleChangeMemInfo = (event) => { // 입력 값 변경 시 상태 업데이트
    const id = event.currentTarget.id;
    const value = event.target.value;
    setMemInfo({ ...memInfo, [id]: value });
    console.log(`입력된 ${id} 값: ${value}`);
  }
  // 아이디 찾기
  const handleFindId = async (event) => {
    event.preventDefault(); // 폼 제출 시 리로딩 방지
    const member = {
      member_name: memInfo.name,
      member_mobile: memInfo.mobile,
      type: "id",
    }
    try {
      console.log(member);
      const res = await memberListDB(member);
      console.log(res);
      if (res.data.length === 0) {
        console.log("회원 정보 없음");
        /* alert("회원 정보가 없습니다"); */
        
       Swal.fire({
        title:'회원 정보가 없습니다.',
        icon:'warning'
       })
  
      } else {
        let msg = '회원 님의 아이디입니다\n';
        let found = false;
        res.data.forEach((memberData) => {
          if (memberData.member_name === memInfo.name && memberData.member_mobile === memInfo.mobile) {
            found = true;
            msg += `[ ${memberData.member_id} ]\n`;
          }
          navigate('/login')
        });
        if (!found) {
          msg = '일치하는 회원 정보가 없습니다';
        }
        /* alert(msg); */
        
Swal.fire({
  title:msg,
  icon:'warning'
  })
  
        console.log(msg);
      }
    } catch (error) {
      /* alert("DB 오류입니다"); */
      
Swal.fire({
  title:'DB 오류입니다.',
  icon:'error'
  })
  
    }
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='center'>
      <LoginForm onSubmit={handleFindId}>
        <MyH1>아이디 찾기</MyH1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', Content: 'center', marginTop: '20px', width: "100%" }}>
          <MyLabel> 이름
            <MyInput type="text" id="name" placeholder="회원님의 이름을 입력해 주세요"
              onChange={(e) => { handleChangeMemInfo(e); }} />
          </MyLabel>
          <MyLabel> 전화번호
            <MyInput type="number" id="mobile" placeholder="회원님의 전화번호를 입력해 주세요"
              onChange={(e) => { handleChangeMemInfo(e); }} />
          </MyLabel>
          <BButton type="onSubmit">찾기</BButton>
        </div>
      </LoginForm>
      </div>
    </div>
  )
}

export default FindIdPage;