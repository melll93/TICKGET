import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { BButton } from '../../styles/formStyle';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { memberDeleteDB, memberListDB } from '../../axios/member/memberCrud';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export const Input = styled.input`
  width: 250px;
  height: 32px;
  display: block;
  border: none;
  border-bottom: 1px solid #dddddd;
  font-size: 15px;
  &:focus,
  &:hover {
    border-bottom: 2px solid rgb(112, 128, 144);
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    font-size: 12px;
  }
  margin-bottom: 10px
`;

const UnRegiesterPage = () => {
  const navigate = useNavigate()
  // 로그인을 하고 나면 리덕스에 이 값이 담겨 있어야 함
  const memberId = useSelector(state => state.userStatus.user);
  //console.log(memberId);
  // const [memberId, setMemberId] = useState();
  // 상수로 처리 test 
/*   useEffect(()=>{
    setMemberId('yeg123') 
  },[]) */ // UnRegiesterPage화면이 열릴 때 최초 딱 한번만 실행됨
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [memInfo, setMemInfo] = useState('');

  const [passwordInput, setPasswordInput] = useState("");

  const changeMemInfo = (e) => {
    setPasswordInput(e.target.value);
    console.log("password : " + e.target.value);
  };

  const handleCheckboxChange = useCallback((e) => {
    const id = e.target.id;
    const isChecked = e.target.checked;

    if (id === "check1") {
      setIsChecked1(isChecked);
    } else if (id === "check2") {
      setIsChecked2(isChecked);
    }
    // 두 체크박스가 모두 체크되었을 경우 제출 버튼 활성화
    setIsSubmitEnabled(isChecked1 && isChecked2);
  }, [isChecked1, isChecked2]);

  const handleDelete = async (e) => {
    console.log(memberId);//yeg123
    e.preventDefault();
    // 비밀번호가 사용자의 비밀번호와 일치하는지 확인합니다
    // 리덕스에 사용자 비밀번호도 필요
    const member = memberListDB.find(member => member.member_id === memberId);
    if (memInfo.password !== member.member_password) {
      console.log('비밀번호 불일치')
      Swal.fire({
        title:'비밀번호를 다시 확인해 주세요.',
        icon:'error'
        })
      return;
    }

    // 사용자의 테이블을 삭제하고 성공 메시지를 표시합니다
    await memberDeleteDB(memberId);
    Swal.fire({
      title:'회원 탈퇴되셨습니다. 저희 사이트를 이용해 주셔서 감사합니다.',
      icon:'success'
      })
      //navigate('/')
  }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <h2>회원 탈퇴 안내</h2>
          <br />
          <div>
            <h5>
              미결 거래가 있는 경우 이로 인해 발생한 청구 금액에 대한 책임은
              귀하에게 있습니다.
            </h5>
            <label>
              <input
                type="checkbox"
                id="check1"
                checked={isChecked1}
                onChange={handleCheckboxChange}
              />

              본인은 모든 미결 금융 거래로 인해 발생하는 청구 금액에 대해 전적으로
              책임이 있음을 인지하며,<br />
              특정한 상황에서는 수익금을 지급받을 수 없다는 사실을 이해합니다.
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                id="check2"
                checked={isChecked2}
                onChange={handleCheckboxChange}
              />
              Tickget 사이트의 계정과 모든 데이터를 완전히 삭제하고자 합니다.
            </label>
            <br />
            <label>
            <Input
                type="password"
                placeholder="탈퇴를 위해 비밀번호를 한 번 더 입력해 주세요."
                value={passwordInput}
                onChange={changeMemInfo}
              />
            </label>
            <br />

            <BButton disabled={!isSubmitEnabled} onClick={handleDelete} >
              탈퇴하기
            </BButton>
          </div>
          {/* 탈퇴 체크 박스 */}
        </div>
      </div>
    </>
  )
}

export default UnRegiesterPage