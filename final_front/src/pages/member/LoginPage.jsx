import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import NaverLogin from "../../api/login/NaverLogin";
import Sidebar from "../../components/Sidebar";
import { loginH } from "../../util/authLogic";

const LoginPage = ({ user, setUser }) => {
  const CALLBACK_URL = "http://localhost:3333/oauth/login/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=6a3741ce2b33e194c3e799c86fdc2cb2&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // 로그인 필요 정보
  const navigate = useNavigate()
  const [id, setId] = useState()
  const [password, setPassword] = useState()
  const [tempUser, setTempUser] = useState({
    id: '',
    password: ''
  });
  //
  const handleIdChange = (event) => {
    setId(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  // 자체 로그인  
  const loginHome = async () => {
/*     try {
      const result = await loginH(auth, tempUser)
      console.log(result)
      console.log(result.user.uid)
      window.sessionStorage.setItem('userId', result.user.uid)
      window.localStorage.setItem('userId', result.user.uid)
      window.localStorage.setItem('member', JSON.stringify({mem_id:'test', mem_pw:'123'}))
      // navigate("/") 
      window.location.reload()
    } catch (error) {
      console.log(error + ": 로그인 에러입니다");
    } */
  }
  return (
    <>
      <Sidebar />
      <div className="center">
        <div className="login">
          {/********************** 자체 회원 로그인 **********************/}
          <Form>
            <Form.Group className="mb-3" onChange={handleIdChange} controlId="formBasicId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="id" placeholder="ID를 입력해주세요." />
            </Form.Group>

            <Form.Group className="mb-3" onChange={handlePasswordChange} controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password를 입력해주세요."
              />
            </Form.Group>
            <Button variant="primary" type="login" onClick={()=>{loginHome()}}>
              로그인
            </Button>
          </Form>
          {/***************************************************************/}
          <hr />

          {/************************* 소셜 로그인 *************************/}
          <div className="socialLogin">
            {/********************** 네이버 로그인 버튼 **********************/}
            <NaverLogin user={user} setUser={setUser} />
            {/************************** 네이버 끝 **************************/}

            {/********************** 카카오 로그인 버튼 **********************/}
            <div className="loginbutton">
              <a href={KAKAO_AUTH_URL}>
                <img
                  className="loginbuttonimg"
                  src="logos/kakao/kakao_login_simple.png"
                />
              </a>
            </div>
            {/************************** 카카오 끝 **************************/}
            {/********************** 카카오 로그인 버튼 **********************/}
            <div className="loginbutton">
              <a href="#">
                <img
                  className="loginbuttonimg"
                  src="logos/google/btn_google_simple.png"
                />
              </a>
            </div>
            {/************************** 카카오 끝 **************************/}
          </div>
          {/************************ 소셜 로그인 끝 ************************/}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
