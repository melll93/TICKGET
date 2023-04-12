import { useNavigate } from 'react-router-dom';
import { BButton, LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { memberListDB } from '../../axios/member/memberLogic';
import { sendResetpwEmail } from '../../util/authLogic';

const ResetPwPage = ({authLogic}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toastMsg, setToastMsg] = useState(""); // 알림 메시지 상태 관리

  const [memInfo, setMemInfo] = useState({
    name: "",
    mobile: "",
    email: ""
  });
  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({...memInfo, [id]: value});
  }

  const send = async() => {
    console.log('비밀번호 변경')
    const member = {
      member_name: memInfo.name,
      member_mobile: memInfo.mobile,
      member_email: memInfo.email
    }
    console.log(member);
    const res = await memberListDB(member);
    console.log(res.data);
    const temp = JSON.stringify(res.data)
    const jsonDoc = JSON.parse(temp)
    console.log(jsonDoc[0]);

    if (!jsonDoc[0]) {
      console.log("아이디 불일치");
      // Dispatch toast message here if needed
    } else {
      console.log('아이디 일치');
      try {
        const msg = await sendResetpwEmail(authLogic.auth, memInfo.email);
        console.log(msg);
        dispatch(setToastMsg(msg));
        navigate('/login');
      } catch (error) {
        dispatch(setToastMsg(error + ": 메일 전송 오류"));
      }
    }
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