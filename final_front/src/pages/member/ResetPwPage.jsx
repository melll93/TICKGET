import { BButton, LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';

const ResetPwPage = () => {

  const send = () => {
    console.log('비밀번호 변경')
  }
  const changeMemInfo = () => {
  
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
        <MyLabel> 이메일
          <MyInput type="email" id="email" placeholder="이메일를 입력해 주세요 " 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <BButton onClick={()=>{send();}}>메일 전송</BButton>
      </div>
    </LoginForm>
  );
};


export default ResetPwPage