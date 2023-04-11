import React from 'react'
import { useState } from 'react';
import { BButton, LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../styles/formStyle';
import { useNavigate } from 'react-router-dom';
import { memberListDB } from '../../axios/member/memberLogic';
import axios from 'axios';


const FindIdPage = () => {
  const [memInfo, setMemInfo] = useState({
    name: "",
    mobile: "",
  });
  const [toastMsg, setToastMsg] = useState(""); // 알림 메시지 상태 관리
  const navigate = useNavigate();

  const handleChangeMemInfo = (event) => { // 입력 값 변경 시 상태 업데이트
    const id = event.currentTarget.id;
    const value = event.target.value;
    setMemInfo({ ...memInfo, [id]: value });
  }
  // 아이디 찾기
  const handleFindId = async () => { 
    const member = {
      memberName: memInfo.name, // 입력 받은 이름
      memberMobile: memInfo.mobile, // 입력 받은 번호
    }
    try {
      const res = await axios.post('memberList', member); // memberListDB에 요청을 보내 일치하는 회원 정보를 가져옴
      if (res.data.length === 0) {
        setToastMsg("일치하는 아이디가 없습니다");
      } else {
        let msg = '회원님의 아이디입니다 \n';
        Object.keys(res.data).forEach((key) => {
          msg += `[ ${res.data[key].member_id} ]\n`; // 일치하는 회원의 아이디를 메시지에 추가
        });
        setToastMsg(msg);
        navigate('/login');
      }
    } catch (error) {
      setToastMsg("DB 오류입니다.");
    }
  }

  return (
    <>
      <LoginForm>
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
          <BButton onClick={() => { handleFindId(); }}>찾기</BButton>
        </div>
      </LoginForm>
      {toastMsg && <toastMsg>{toastMsg}</toastMsg>} {/* 알림 메시지 표시 */}
    </>
  )
}

export default FindIdPage;