import React from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { changePwUpdateDB } from '../../axios/member/memberCrud';
import { useNavigate } from 'react-router-dom';
import { checkPassword, validatePassword } from '../../util/validateLogic';
import Swal from "sweetalert2";
import styled from 'styled-components';

export const MButton = styled.button`
  border-radius: 12px;
  border: none;
  background-color: rgb(80, 50, 200);
  color: white;
  width: 125px;
  height: 45px;
  font-weight: bold;
  &:hover {
    background-color: rgb(50, 50, 120);
  }
`;

const ChangePwPage = () => {
  const navigate = useNavigate()
  const memberId = useSelector(state => state.userStatus.user);

  const [memInfo, setMemInfo] = useState({
    pw: '',
    pwConfirm: '',
  })
  const [comment, setComment] = useState({
    pw: "",
    pwConfirm: ""
  })

// 유효성 검사
  const validate = (key, e) => {
    let result;
    if (key === 'pw') {
      result = validatePassword(e);
    } else if (key === 'pwConfirm') {
      result = checkPassword(memInfo.pw, e);
    }
    setComment({ ...comment, [key]: result });
  }
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

  const handlePwUpdate = async (e) => {
    e.preventDefault();
    if (memInfo.pw === memInfo.pwConfirm) {
      console.log('비밀번호가 일치합니다.');
/*       Swal.fire({
        title:'비밀번호가 일치합니다.',
        icon:'success'
        }) */
        
      try {
        const member = {
          memberId: memberId,
          memberPassword: memInfo.pw,
        };
        const res = await changePwUpdateDB(member);
        console.log(res.data);
        Swal.fire({
          title:'비밀번호가 성공적으로 변경되었습니다.',
          icon:'success'
          })
          
        navigate('/login')
      } catch (error) {
        console.error(error);
        Swal.fire({
          title:'비밀번호 변경에 실패하였습니다.',
          icon:'error'
          })
          
      }
    } else {
      console.log('비밀번호 불일치');
      Swal.fire({
        title:'비밀번호가 일치하지 않습니다.',
        icon:'error'
        })
        
    }
  };

  return (
    <>
      <LoginForm>
        <MyH1></MyH1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', Content: 'center', marginTop: '20px', width: "100%" }}>
          <MyLabel> 비밀번호
            <MyInput type="password" id="pw" placeholder="변경하실 새로운 비밀번호를 입력해 주세요"
              onKeyUp={(e) => { setComment({ ...comment, pwConfirm: checkPassword(e.target.value, memInfo.pwConfirm) }); }}
              onChange={(e) => { changeMemInfo(e); validate('pw', e); }} />
              {comment.pw}
          </MyLabel>
          <MyLabel> 비밀번호 재입력
            <MyInput type="password" id="pwConfirm" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('pwConfirm', e.target.value); }} />
              {comment.pwConfirm}
          </MyLabel>
          <MButton type="submit" onClick={handlePwUpdate}>변경</MButton>
        </div>
      </LoginForm>
    </>
  )
}

export default ChangePwPage