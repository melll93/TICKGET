import React from 'react'
import { useState } from 'react';
import { BButton, LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../styles/formStyle';

const FindIdPage = () => {
  const [memInfo, setMemInfo] = useState({
    name: "",
    hp: "",
  });
  const changeMemInfo = (event) => {
    const id = event.currentTarget.id;
    const value = event.target.value;
    setMemInfo({...memInfo, [id]: value});
  }
  const find = async() => {
    const member = {
      mem_name : memInfo.name,
      mem_tel : memInfo.hp,
      type : 'email',
    }
  }
  return (
    <LoginForm>
    <MyH1>이메일 찾기</MyH1>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
      <MyLabel> 이름
        <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
        onChange={(e)=>{changeMemInfo(e);}}/>
      </MyLabel>
      <MyLabel> 전화번호
        <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
        onChange={(e)=>{changeMemInfo(e);}} />
      </MyLabel>
      <BButton onClick={()=>{find();}}>찾기</BButton>
    </div>
  </LoginForm>
  )
}

export default FindIdPage