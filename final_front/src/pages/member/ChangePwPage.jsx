import React from 'react'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
// import { createAction } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { BButton, LoginForm, MyH1, MyInput, MyLabel, PwEye  } from '../../styles/formStyle';
import { memberUpdateDB } from '../../axios/member/memberLogic';


const ChangePwPage = () => {
  const memberId = useSelector(state => state.userStatus.user);
  const [memInfo, setMemInfo] = useState({
    pw: '',
    pwConfirm: '',
  });

  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    if (id === 'pw') {
      console.log(memberId);

      console.log('pw: ' + value);
      setMemInfo({ ...memInfo, pw: value });
    } else if (id === 'pwConfirm') {
      console.log('pwconfirm: ' + value);
      setMemInfo({ ...memInfo, pwConfirm: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (memInfo.pw === memInfo.pwConfirm) {
      console.log('비밀번호가 일치합니다.');
      alert('비밀번호가 일치합니다.');
      try {
        const member = {
          memberId: memberId,
          memberPassword: memInfo.pw,
        };
        const res = await memberUpdateDB(member);
        console.log(res.data);
        alert('비밀번호가 성공적으로 변경되었습니다');
        // 
      } catch (error) {
        console.error(error);
        alert('비밀번호 변경에 실패하였습니다');
      }
    } else {
      console.log('비밀번호 불일치');
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <LoginForm>
        <MyH1></MyH1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', Content: 'center', marginTop: '20px', width: "100%" }}>
          <MyLabel> 비밀번호
            <MyInput type="password" id="pw" placeholder="변경하실 새로운 비밀번호를 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); }} />
          </MyLabel>
          <MyLabel> 비밀번호 재입력
            <MyInput type="password" id="pwConfirm" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e);  }} />
          </MyLabel>
          <BButton type="submit" onClick={handleFormSubmit}>변경</BButton>
        </div>
      </LoginForm>
    </>
  )
}

export default ChangePwPage