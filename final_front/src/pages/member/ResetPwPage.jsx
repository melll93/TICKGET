import { useNavigate } from 'react-router-dom';
import { BButton, LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { memberListDB } from '../../axios/member/memberLogic';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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

  const [button, setButton] = useState(true);

  const send = async (event) => {
    event.preventDefault();
    console.log('비밀번호 찾기');
    const member = {
      mem_name: memInfo.name,
      mem_tel: memInfo.mobile,
      mem_email: memInfo.id,
      type: 'overlap',
    };
    console.log(member);
    const res = await memberListDB(member);
    console.log(res.data);
    const temp = JSON.stringify(res.data);
    const jsonDoc = JSON.parse(temp);
    console.log(jsonDoc[0]);
  
    if (!jsonDoc[0]) {
      console.log('일치하는 아이디가 없습니다.');
      dispatch(setToastMsg('일치하는 사용자 정보가 없습니다.'));
    } else {
      console.log('일치하는 아이디가 있습니다.');
      // Redirect to change password page (changePwPage)
      // You can replace '/changePwPage' with the actual URL or route for your change password page
      window.location.href = '/changePw';
    }


    
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
    /* 
      아이디를 통해 DB에서 이름과 전화번호값을 찾고 사용자가 입력한 이름과 전화번호가 일치하는 지 비교
      일치하면 비밀번호 변경 페이지로 이동
      불일치하면 alert -> 사용자와 일치하는 정보를 입력해 주세요
      아이디 자체가 없는 경우 alert -> 사용자의 정보가 없습니다
     */
    <LoginForm onSubmit={send}>
      <MyH1>비밀번호 변경</MyH1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
        <MyLabel> 아이디
          <MyInput type="text" id="id" placeholder="아이디를 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 이름 
          <MyInput type="text" id="name" placeholder="이름을 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 전화번호
          <MyInput type="number" id="mobile" placeholder="전화번호를 입력해 주세요" 
          onChange={(e)=>{changeMemInfo(e);}} />
        </MyLabel>
        <BButton type="onSubmit">비밀번호 변경</BButton>
      </div>
    </LoginForm>
  );
};


export default ResetPwPage