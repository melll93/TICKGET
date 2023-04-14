import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NaverLogin from "../../api/login/NaverLogin";
import Sidebar from "../../components/Sidebar";
import {
  GoogleButton,
  MyInput,
  MyLabel,
  MyP,
  PwEye,
} from "../../styles/formStyle";
import { loginGoogle, loginH } from "../../util/authLogic";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reduxLogin } from "../../redux/userAuth/action";
import { Cookies, useCookies } from "react-cookie";
import Header from "../../components/Header";
/* import { EyeFill, EyeSlashFill } from 'react-icons/io5';
 */
const cookies = new Cookies();

const LoginPage = ({ user, setUser, authLogic }) => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.userStatus.user);

  const navigate = useNavigate();
  const CALLBACK_URL = "http://localhost:3333/oauth/login/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${CALLBACK_URL}&response_type=code`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=6a3741ce2b33e194c3e799c86fdc2cb2&redirect_uri=${CALLBACK_URL}&response_type=code`;

  /************************************comment************************************
   * id, password로 처리할 경우 추후 보안처리할 때 변수를 수정해야 할 가능성이 높아보임.
   * 이벤트 처리는 각 변수를 따로 state로 처리하고 BE로 전송할 member(tempUser)객체를 따로 담아줌.
   *******************************************************************************/
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  // 로그인 필요 정보
  const member = {
    memberId: userId,
    memberPassword: userPw,
  };

  const login = async (paramMember) => {
    const result = await axios({
      method: "POST",
      url:
        // process.env.BACKEND_URL + "member/login/local",
        "http://localhost:8888/member/login/local",
      data: paramMember,
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          // 팝업창 구현
          window.alert(res.data.msg);
        } else if (res.data.code === 1) {
          const userResponse = res.data.user;
          const user = {
            id: userResponse.memberId,
            email: userResponse.memberEmail,
            name: userResponse.memberName,
            nickname: userResponse.memberNickname,
            profile_img: userResponse.memberProfileImage,
          };
          cookies.set("_userData", user);
          dispatch(reduxLogin(user));
          window.alert("로그인 성공");
          navigate("/");
        }
      })
      .catch(console.log);
  };

  /************************************comment************************************
   * 조장 생각 : 변수와 메소드가 많아지며 명칭이 많아져 코드가 많아질수록 혼동할 가능성이 높아짐.
   * 하나의 메소드로 핸들링할 수 있는 경우, 각 변수별 메소드를 만드는 것이 아닌 하나의 메소드 내에서 케이스를 다룬다.
   * => handleChange 참고
   * 짧은 코드의 메소드같은 경우 따로 선언하기보단 Component의 onChange/onClick내에서 익명함수로 처리한다.
   * => <Button>로그인</Button> 참고
   *******************************************************************************/

  const handleChange = (event) => {
    const type = event.target.type;
    const targetId = event.target.id;
    console.log(type);

    if (targetId == "id") {
      setUserId(event.target.value);
    } else if (targetId == "pw") {
      setUserPw(event.target.value);
    }
  };
  console.log("id : " + userId);
  console.log("pw : " + userPw);

  // 자체 로그인
  // DB 타는 것까지는 구현 성공(전체 memberList) -> login mapper 수정 필요
  // axios 구현
  const loginLocal = async () => {
    try {
      const result = await loginH(member);
      console.log(result);
      console.log(result.user.id);
      // 세션 스토리지에 아이디값 저장
      // 로컬 스토리지에 아이디값 저장
      window.localStorage.setItem("userId", result.user.id);
      navigate("/");
    } catch (error) {
      console.log(error + ": 로그인 에러입니다");
    }
  };

  // 구글 로그인
  const loginG = async () => {
    try {
      const result = await loginGoogle(
        authLogic.getUserAuth(),
        authLogic.getGoogleAuthProvider()
      );
      console.log(result.data);
      //navigate("/")
      //window.location.reload()
    } catch (error) {
      console.log("로그인 오류입니다");
    }
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div
        style={{
          alignItems: "center",
          display: "inline-block",
          position: "absolute",
          left: "15vw",
          width: "85vw",
          height: "100vh",
        }}
      >
        <div className="login">
          {/********************** 자체 회원 로그인 **********************/}
          <Form>
            {/**************************************************** ID START ***************************************************/}
            <MyLabel htmlFor="id">
              {" "}
              ID
              <MyInput
                id="id"
                type="text"
                name="member_id"
                placeholder="ID를 입력해주세요."
                onChange={(event) => {
                  handleChange(event);
                }}
              />
            </MyLabel>
            {/***************************************************** ID END ****************************************************/}
            {/**************************************************** PW START ***************************************************/}
            <MyLabel htmlFor="pw">
              {" "}
              Password
              <MyInput
                id="pw"
                type="password"
                autoComplete="off"
                name="member_pw"
                placeholder="비밀번호를 입력해주세요."
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              {/* <div id="password" onClick={(event) => { handlePasswordChange(event) }} style={{ color: `${password.visible ? "gray" : "lightgray"}` }}> */}
              {/* <PwEye className="fa fa-eye fa-lg"></PwEye> */}
              {/* </div> */}
            </MyLabel>
            {/***************************************************** PW END ****************************************************/}
            {/*  */}
            <div style={{ textAlign: "right" }}>
              {/* <Button variant="primary" type="login" onClick={() => { loginLocal() }}> */}
              {/* axios 이벤트로 처리 여기서 */}
              <Button
                variant="primary"
                type="login"
                onClick={(e) => {
                  e.preventDefault();
                  login(member);
                }}
              >
                로그인
              </Button>
            </div>

            <br />
            <div style={{ textAlign: "center" }}>
              <MyP>
                신규 사용자이신가요?&nbsp;
                <Link
                  to="/register"
                  className="text-decoration-none"
                  style={{ color: "blue" }}
                >
                  회원가입으로
                </Link>
              </MyP>
              <MyP>
                아이디를 잊으셨나요?&nbsp;
                <Link
                  to="/findId"
                  className="text-decoration-none"
                  style={{ color: "blue" }}
                >
                  아이디 찾기
                </Link>
              </MyP>
              <MyP>
                비밀번호를 잊으셨나요?&nbsp;
                <Link
                  to="/resetPw"
                  className="text-decoration-none"
                  style={{ color: "blue" }}
                >
                  비밀번호 변경
                </Link>
              </MyP>
            </div>
          </Form>
          {/***************************************************************/}
          <hr />

          {/************************************************** 소셜 로그인 **************************************************/}
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
            <div
              className="loginbutton"
              type="button"
              onClick={() => {
                loginG();
              }}
            >
              <a href="#">
                <img
                  className="loginbuttonimg"
                  src="logos/google/btn_google_simple.png"
                />
              </a>
            </div>
            {/************************** 구글 끝 **************************/}
          </div>
          {/************************************************* 소셜 로그인 끝 *************************************************/}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
