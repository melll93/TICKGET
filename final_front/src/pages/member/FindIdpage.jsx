import React from 'react'
import { useState } from 'react';
import { BButton, LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../styles/formStyle';
import { useNavigate } from 'react-router-dom';
import { memberListDB } from '../../axios/member/memberLogic';
import { setToastMsg } from '../../redux/toastStatus/action';
import { useDispatch, useSelector } from 'react-redux';

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
        setToastMsg("존재하지 않는 회원입니다.");
      } else {
        let msg = '회원님의 아이디입니다.\n';
        res.data.forEach((memberData) => {
          if (memberData.member_name === memInfo.name && memberData.member_mobile === memInfo.mobile) {
            msg += `[ ${memberData.member_id} ]\n`;
          }
        });
        if (msg === '회원님의 아이디입니다.\n') {
          msg = '일치하는 회원이 없습니다.';
        }
        setToastMsg(msg);
        console.log(msg);
      }
    } catch (error) {
      setToastMsg("DB 오류입니다.");
    }
  }

  return (
    <>
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
      {toastMsg && <toastMsg>{toastMsg}</toastMsg>}
    </>
  )
}

export default FindIdPage;