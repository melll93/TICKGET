import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from './api'; // sendEmail 함수를 불러온다.

const EmailVerifiedPage = ({ email }) => { // 이메일을 prop으로 받아온다.
  const navigate = useNavigate();

  const handleSendEmail = async () => { // 이메일 재전송 처리 함수
    const msg = await sendEmail(email); // 입력받은 이메일을 인자로 sendEmail 함수를 호출한다.
    console.log(msg);
  }

  const handleLogout = () => { // 로그아웃 처리 함수
    navigate('/');
  }

  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <h4>{sessionStorage.getItem('nickname')} 사용하실 이메일을 인증해 주세요</h4>
        <p>회원가입 시 입력하신 이메일 주소를 통해 인증 메일을 확인해 주세요</p>
        <div style={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}>
          <button type="button" onClick={handleSendEmail}>이메일 재전송</button>
          <button type="button" onClick={() => { navigate('/'); window.location.reload(); }}>완료</button>
          <button type="button" onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </>
  );
};

export default EmailVerifiedPage;