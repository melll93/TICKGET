import React, {useState} from 'react'
import { BButton, LoginForm, MyH1, MyInput, MyLabel, PwEye  } from '../../styles/formStyle';
import { memberUpdateDB } from '../../axios/member/memberLogic';
import { checkPassword, validatePassword } from '../../util/validateLogic';

const ChangePwPage = () => {
const [memInfo, setMemInfo] = useState({
  pw: "",
  pwConfirm: ""
});
const [passwordMatch, setPasswordMatch] = useState(true); 

// pw와 pwConfirm 값 콘솔창에서 확인
const changeMemInfo = (e) => {
  const id = e.currentTarget.id;
  const value = e.target.value;
  if (id === "pw") {
    console.log("pw: " + value); 
    setMemInfo({ ...memInfo, pw: value });
  } else if (id === "pwConfirm") {
    console.log("pwconfirm: " + value); 
    setMemInfo({ ...memInfo, pwConfirm: value });
  }
}
const [comment, setComment] = useState({
  pw: "",
  pwConfirm: "",
});
// 비밀번호 변경 입력 시 출력될 validate
const validate = (key, e) => {
  let result;
  if (key === 'pw') {
    result = validatePassword(e);
  } else if (key === 'pwConfirm') {
    result = checkPassword(memInfo.pw, e);
  }
  setComment({ ...comment, [key]: result });
}

const handleFormSubmit = async(e) => {
e.preventDefault();
  if (memInfo.pw === memInfo.pwConfirm) {
    console.log("비밀번호가 일치합니다."); 
    alert("비밀번호가 일치합니다."); 
  } else {
    console.log("비밀번호가 일치하지 않습니다."); 
    alert("비밀번호가 일치하지 않습니다."); 
  }
  try {
    const member = {
      mem_id: memInfo.id,
      mem_pw: memInfo.pw
    }
    const res = await memberUpdateDB(member);
    console.log(res.data);
  
    alert("비밀번호가 성공적으로 변경되었습니다");
    // window.location.href = '/login';
  } catch (error) {
    console.error(error);
    alert("비밀번호 변경에 실패하였습니다");
  }
}


  return (
<>
      <LoginForm>
        <MyH1></MyH1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', Content: 'center', marginTop: '20px', width: "100%" }}>
          <MyLabel> 비밀번호
            <MyInput type="password" id="pw" placeholder="변경하실 새로운 비밀번호를 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('pw', e); }} />
          </MyLabel>
          <MyLabel> 비밀번호 재입력
            <MyInput type="password" id="pwConfirm" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('pwConfirm', e.target.value); }} />
          </MyLabel>
          <BButton type="submit" onClick={handleFormSubmit}>변경</BButton>
        </div>
      </LoginForm>
    </>
  )
}

export default ChangePwPage