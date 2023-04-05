import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NaverLogin from "../../api/login/NaverLogin";
import Sidebar from "../../components/Sidebar";
import { GoogleButton, MyP } from "../../styles/formStyle";
import { loginGoogle, loginH } from "../../util/authLogic";
/* import { EyeFill, EyeSlashFill } from 'react-icons/io5';
 */

const LoginPage = ({ user, setUser, authLogic }) => {
  const CALLBACK_URL = "http://localhost:3333/oauth/login/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=6a3741ce2b33e194c3e799c86fdc2cb2&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // 로그인 필요 정보
  const navigate = useNavigate()
  // const auth = authLogic.getUserAuth()
  const [tempUser, setTempUser] = useState({
    id: "",
    password: ""
  });
  const [password, setPassword] = useState({ 
    type: "password",
    visible: false
  });
  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });
  //
  const handleIdChange = (event) => {
    const id = event.currentTarget.id;
    const value = event.target.value;
    setTempUser({ ...tempUser, [id]: value });
  }

  const handlePasswordChange = (event) => {
    const id = event.currentTarget.id;
    if (id === "password") {
      if (!password.visible) {
        setPassword({ ...password, type: 'text', visible: true });
      } else {
        setPassword({ ...password, type: 'password', visible: false });
      }
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    if (tempUser.id !== "" && tempUser.password !== "") {
      setSubmitBtn({ disabled: false, bgColor: 'rgb(105, 175, 245)' });
    } else {
      setSubmitBtn({ disabled: true, bgColor: 'rgb(175, 210, 244)' });
    }
  }, [tempUser]);

  // 자체 로그인 
  // DB 타는 것까지는 구현 성공
  // 콘솔에 값이 안 찍힘
  const loginLocal = async () => {
    try {
      const result = await loginH(tempUser);
      console.log(result);
      console.log(result.user.id);
      // 세션 스토리지에 아이디값 저장
      window.sessionStorage.setItem('userId', result.user.id);
      // 로컬 스토리지에 아이디값 저장
      window.localStorage.setItem('userId', result.user.id);
      // navigate("/")
    } catch (error) {
      console.log(error + ": 로그인 에러입니다");
    }
  }
  // const loginLocal = async () => {
  //   try {
  // const result = await loginH(auth, tempUser)
  // console.log(result)
  // console.log(result.user.uid)
  // window.sessionStorage.setItem('userId', result.user.uid)
  // window.localStorage.setItem('userId', result.user.uid)
  //     window.localStorage.setItem('member', JSON.stringify({ mem_id: 'test', mem_pw: '123' }))
  //     navigate("/")
  //     window.location.reload()
  //   } catch (error) {
  //     console.log(error + ": 로그인 에러입니다");
  //   }
  // }

  // 구글 로그인
  const loginG = async () => {
    try {
      const result = await loginGoogle(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
      console.log(result.data)
      //navigate("/")
      //window.location.reload()
    } catch (error) {
      console.log('로그인 오류입니다')
    }
  }
  return (
    <>
      <Sidebar />
      <div className="center">
        <div className="login">
          {/********************** 자체 회원 로그인 **********************/}
          <Form>
          <Form.Group className="mb-3" controlId="id">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="ID를 입력해주세요." onChange={handleIdChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control type={password.type} placeholder="Password를 입력해주세요." onChange={handlePasswordChange} />
          <div className="ms-2" onClick={handlePasswordChange}>
            {/* {password.visible ? <EyeSlashFill /> : <EyeFill />} */}
          </div>
        </div>
      </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button variant="primary" type="login" onClick={(loginLocal)}>
                로그인
              </Button>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              {/* <Form style={{ textAlign: "center" }}> */}
              <MyP>신규 사용자이신가요?&nbsp;<Link to="/register" className="text-decoration-none" style={{ color: "blue" }}>회원가입으로</Link></MyP>
              <MyP>아이디를 잊으셨나요?&nbsp;<Link to="/findId" className="text-decoration-none" style={{ color: "blue" }}>아이디 찾기</Link></MyP>
              <MyP>비밀번호를 잊으셨나요?&nbsp;<Link to="/resetPw" className="text-decoration-none" style={{ color: "blue" }}>비밀번호 변경</Link></MyP>
              {/* </Form> */}
            </div>
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
            {/********************** 구글 로그인 버튼 **********************/}
            <div className="loginbutton" type="button" onClick={() => { loginG(); }}>
              <a href="#">
                <img
                  className="loginbuttonimg"
                  src="logos/google/btn_google_simple.png"
                />
              </a>
            </div>
            {/************************** 구글 끝 **************************/}
          </div>
          {/************************ 소셜 로그인 끝 ************************/}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
