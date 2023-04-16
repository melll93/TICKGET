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
    console.log(`${id}: ${value}`);
    setMemInfo({ ...memInfo, [id]: value });
  }

  const [button, setButton] = useState(true);

  const send = async (event) => {
    event.preventDefault();
    
    const member = {
      mem_id: memInfo.id,
      mem_name: memInfo.name,
      mem_mobile: memInfo.mobile,
      type: 'overlap',
    };
    console.log(member);
    const res = await memberListDB(member);
    console.log(res.data);
    const temp = JSON.stringify(res.data);
    const jsonDoc = JSON.parse(temp);
    console.log(jsonDoc[0]);

    // memberList를 타고는 있으나 값을 비교하지 못하고 있는 오류 발생 우짤램...
    if (!jsonDoc[0]) {
      console.log('회원 정보 없음');
      dispatch(setToastMsg('일치하는 사용자 정보가 없습니다'));
      alert('회원가입되지 않은 아이디입니다');
    } else if (jsonDoc[0].mem_id === memInfo.id && jsonDoc[0].mem_name === memInfo.name && jsonDoc[0].mem_tel === memInfo.mobile) {
      console.log('비밀번호 변경 성공');
      window.location.href = '/changePw';
    } else if (jsonDoc[0].mem_id === memInfo.id && jsonDoc[0].mem_name !== memInfo.name && jsonDoc[0].mem_tel !== memInfo.mobile) {
      console.log('아이디 일치, 이름, 전화번호 불일치');
      alert('회원 님의 이름과 전화번호를 다시 확인해 주세요.');
    } else if (jsonDoc[0].mem_id === memInfo.id && jsonDoc[0].mem_name !== memInfo.name) {
      console.log('아이디 일치, 이름 불일치');
      alert('회원 님의 이름을 다시 확인해 주세요.');
    } else if (jsonDoc[0].mem_id === memInfo.id && jsonDoc[0].mem_tel !== memInfo.mobile) {
      console.log('아이디 일치, 전화번호 불일치');
      alert('회원 님의 전화번호를 다시 확인해 주세요.');
    } else {
      console.log('사용자 정보 확인 실패');
      alert('회원 님의 사용자 정보를 다시 확인해 주세요.');
    }
/*     if (!jsonDoc[0]) {
      console.log('회원 정보 없음');
      dispatch(setToastMsg('일치하는 사용자 정보가 없습니다'));
      alert('회원가입되지 않은 아이디입니다');
    } else if (
      jsonDoc[0].mem_name === memInfo.name &&
      jsonDoc[0].mem_tel === memInfo.mobile
    ) {
      console.log('비밀번호 변경 성공');
      window.location.href = '/changePw';
    } else {
      console.log('사용자 정보 확인 실패');
      alert('회원 님의 사용자 정보를 다시 확인해 주세요.');
    } */
  }

  return (
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