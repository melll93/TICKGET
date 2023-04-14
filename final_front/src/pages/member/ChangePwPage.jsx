import React, {useState} from 'react'
import { BButton, LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { memberUpdateDB } from '../../axios/member/memberLogic';

const ChangePwPage = () => {
const [memInfo, setMemInfo] = useState({
  pw: "",
  pwConfirm: ""
});
const [passwordMatch, setPasswordMatch] = useState(true); 

const changeMemInfo = (e) => {
   const id = e.currentTarget.id;
   const value = e.target.value;
   if (id === "pw") {
    console.log("pw: " + value); // Log pw value
    setMemInfo({ ...memInfo, pw: value }); // Update pw value in state
  } else if (id === "pwConfirm") {
    console.log("pwconfirm: " + value); // Log pwconfirm value
    setMemInfo({ ...memInfo, pwConfirm: value }); // Update pwConfirm value in state
    setPasswordMatch(memInfo.pw === value); // Check if passwords match
  }
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (!passwordMatch) {
    console.log("비밀번호가 일치하지 않습니다.");
    return;
  }

  console.log("입력 받은 비밀번호: ", memInfo.pw);

  try {
    // Call memberUpdateDB with updated password
    const member = {
      mem_id: memInfo.id,
      mem_pw: memInfo.pw
    }
    const res = await memberUpdateDB(member);
    console.log(res.data);

    // Show success message and redirect to resetPwPage
    alert("비밀번호가 성공적으로 변경되었습니다.");
    // Redirect to resetPwPage
    // window.location.href = '/resetPwPage';
  } catch (error) {
    console.error(error);
    // Show error message
    alert("비밀번호 변경에 실패하였습니다.");
  }
}

  return (
<>
      <LoginForm>
        <MyH1></MyH1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', Content: 'center', marginTop: '20px', width: "100%" }}>
          <MyLabel> 비밀번호
            <MyInput type="password" id="pw" placeholder="변경하실 새로운 비밀번호를 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); }} />
          </MyLabel>
          <MyLabel> 비밀번호 재입력
            <MyInput type="password" id="pwConfirm" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); }} />
          </MyLabel>
          <BButton type="submit" onClick={handleFormSubmit}>변경</BButton>
        </div>
      </LoginForm>
    </>
  )
}

export default ChangePwPage