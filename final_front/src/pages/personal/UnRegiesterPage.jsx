import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { BButton } from '../../styles/formStyle';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { memberDeleteDB, memberListDB } from '../../axios/member/memberCrud';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";

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

  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); // 사용자 정보
  console.log(_userData)
/*   useEffect(()=>{
    setMemberId('yeg123') 
  },[]) */ // UnRegiesterPage화면이 열릴 때 최초 딱 한번만 실행됨

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  // 1
  const [passwordInput, setPasswordInput] = useState("");

  // 2 아이디, 전화번호 비교
  /* 
  const [id, setId] = useState("");
  const [mobile, setMobile] = useState("");
  */

  // 1
  const changeMemInfo = (e) => {
    setPasswordInput(e.target.value);
    console.log("password : " + e.target.value);
  };

  // 2 아이디, 전화번호 비교
  /* 
    const changeMemInfo = (e) => {
    const { id, value } = e.target;
    if (id === "id") {
      setId(value);
    } else if (id === "mobile") {
      setMobile(value);
    }
  };
  */

  // 체크 박스
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

  // 1
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // 1 입력한 비밀번호와 저장된 비밀번호가 일치하는지 확인
      // 쿠키에 담긴 비밀번호 암호화 -> 비교 어떻게?
      // 2 간단하게 사용자 아이디, 전화번호 입력 받고 쿠키/DB 비교하여 두 가지다 일치하는 경우 테이블 삭제
      if (_userData.memberPassword !== passwordInput) {
        console.log("비밀번호 불일치");
        Swal.fire({
          title:'비밀번호를 다시 확인해 주세요.',
          })
        return;
      }
      const res = await memberDeleteDB(_userData);
      // 회원 삭제 성공 시 쿠키 제거 및 페이지 이동
      if (res.data.success) {
        cookies.remove("_userData");
        Swal.fire({
          title:'회원 탈퇴되셨습니다. 저희 사이트를 이용해 주셔서 감사합니다.',
          })
        navigate('/')
      } else {
        console.log("회원 탈퇴 실패");
        Swal.fire({
          title:'회원 탈퇴에 실패하였습니다. 회원 님의 정보를 다시 확인해 주세요.',
          })
      }
    } catch (error) {
      console.log("error : " + error)
    }

    // 2 2 아이디, 전화번호 비교
    /* 
      const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { memberId, memberMobile } = _userData;
      if (id === "" || mobile === "") {
        Swal.fire({
          title: "회원 님의 아이디와 전화번호를 모두 입력해 주세요.",
        });
        return;
      }
      if (id !== memberId || mobile !== memberMobile) {
        Swal.fire({
          title: "회원 님의 정보를 다시 확인해 주세요.",
        });
        return;
      }
      const res = await memberDeleteDB(_userData);
      if (res.data.success) {
        cookies.remove("_userData");
        Swal.fire({
          title: "회원 탈퇴되셨습니다. 저희 사이트를 이용해 주셔서 감사합니다.",
        });
        navigate("/");
      } else {
        console.error("회원 탈퇴 실패");
          Swal.fire({
          title: "회원 탈퇴에 실패하였습니다. 회원 님의 정보를 다시 확인해 주세요.",
        });
      }
    } catch (error) {
      console.error("error : " + error);
    }
  };
    */
  }
  return (
    <>
      <div className="mypage_center">
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
              <input  ㅍ
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