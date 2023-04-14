import { useNavigate } from 'react-router-dom';
import { BButton, LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { memberListDB } from '../../axios/member/memberLogic';

const ResetPwPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toastMsg, setToastMsg] = useState(""); // 알림 메시지 상태 관리

  const [memInfo, setMemInfo] = useState({
    name: "",
    mobile: "",
    id: ""
  });

  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({ ...memInfo, [id]: value });
  }

  const send = async () => {
    // nodemailer -> stream 모듈이 사용되기 때문에 이 모듈에 대한 폴리필이 필요하다고 함 
/*     try {
      // memberListDB를 통해 사용자의 email을 가져오는 API 호출
      const emailResponse = await memberListDB(memInfo);
      const email = emailResponse.data.email;

      // nodemailer를 사용하여 비밀번호 변경 이메일 전송
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your_email@example.com', // 이메일 계정
          pass: 'your_email_password' // 이메일 계정 비밀번호
        }
      });

      const mailOptions = {
        from: 'your_email@example.com', // 이메일 발송자
        to: email, // 이메일 수신자
        subject: '비밀번호 변경 안내', // 이메일 제목
        text: '비밀번호를 변경하려면 다음 링크를 클릭하세요: http://yourwebsite.com/resetPassword' // 이메일 내용
      };

      await transporter.sendMail(mailOptions);
      console.log('비밀번호 변경 이메일이 전송되었습니다.');

      // 사용자에게 비밀번호 변경 안내 메시지 표시
      alert('비밀번호 변경 안내 이메일이 전송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      console.error('비밀번호 변경 이메일 전송 실패:', error);
      // 에러 처리
    } */
  }

  return (
    <LoginForm>
      <MyH1>비밀번호 변경</MyH1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
        <MyLabel> 이름 
          <MyInput type="text" id="name" placeholder="이름을 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 전화번호
          <MyInput type="number" id="mobile" placeholder="전화번호를 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}} />
        </MyLabel>
        <MyLabel> 아이디
          <MyInput type="text" id="id" placeholder="아이디를 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <BButton onClick={()=>{send();}}>메일 전송</BButton>
      </div>
    </LoginForm>
  );
};


export default ResetPwPage