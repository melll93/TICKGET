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

  // memberListDB를 통해 아이디, 이름, 비밀번호 변경 중복 확인 코드
  // 비밀번호를 바꾸기 위해 아이디, 이름, 비밀번호를 사용자에게 입력 받음
  // 1 아이디, 이름, 비밀번호 입력값이 DB의 값과 동일할 때 changePw 페이지 이동(사용자의 아이디를 쥐고 새로운 비밀번호 입력 받아야하는지)
  // 2 아이디는 일치하지만 이름, 비밀번호 일치하지 않는 경우 -> 사용자 정보 확인 일치 
  // 3 받은 값이 DB에 없는 값(null)인 경우 -> 회원가입 유도
  // 1,2,3 모두 사용자 정보를 비교하지 못하는 오류 발생 <- 질문해야 함
  const handleResetPw = async (event) => {
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
if (res.data.length === 0) {
console.log('회원 정보 없음');
dispatch(setToastMsg('일치하는 사용자 정보가 없습니다'));
alert('회원가입되지 않은 아이디입니다');
} else {
const memberData = res.data[0];
if (memberData.mem_id === memInfo.id && memberData.mem_name === memInfo.name && memberData.mem_mobile === memInfo.mobile) {
console.log('비밀번호 변경 성공');
window.location.href = '/changePw';
} else if (memberData.mem_id === memInfo.id && memberData.mem_name !== memInfo.name && memberData.mem_mobile !== memInfo.mobile) {
console.log('아이디 일치, 이름, 전화번호 불일치');
alert('회원 님의 이름과 전화번호를 다시 확인해 주세요.');
} else if (memberData.mem_id === memInfo.id && memberData.mem_name !== memInfo.name) {
console.log('아이디 일치, 이름 불일치');
alert('회원 님의 이름을 다시 확인해 주세요.');
} else if (memberData.mem_id === memInfo.id && memberData.mem_mobile !== memInfo.mobile) {
console.log('아이디 일치, 전화번호 불일치');
alert('회원 님의 전화번호를 다시 확인해 주세요.');
} else {
console.log('사용자 정보 확인 실패');
alert('회원 님의 사용자 정보를 다시 확인해 주세요.');
}
}
// 둘 다 같은 오류(모든 값이 비교되지 않음) 
/*     const member = {
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
 */
  }

  return (
    <LoginForm onSubmit={handleResetPw}>
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