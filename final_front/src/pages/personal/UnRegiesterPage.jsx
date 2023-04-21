import React, { useCallback, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { BButton } from '../../styles/formStyle';
import styled from 'styled-components';

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
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");

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

  const handleDelete = () => {

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
                placeholder="탈퇴를 위해 비밀번호를 한 번 더 입력해 주세요"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
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