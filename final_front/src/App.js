import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import "./App.css";
import BoardDetail from "./pages/board/BoardDetail";
import Write from "./pages/board/Write";
import AddProductsPage from "./pages/community/AddProductsPage";
import CalendarPage from "./pages/community/CalendarPage";
import CarpoolPage from "./pages/community/CarpoolPage";
import ConcertPage from "./pages/community/ConcertPage";
import DonationPage from "./pages/community/DonationPage";
import FestivalPage from "./pages/community/FestivalPage";
import HomePage from "./pages/community/HomePage";
import ProductsDetails from "./pages/community/ProductsDetails";
import SearchResultPage from "./pages/community/SearchResultPage";
import TogetherPage from "./pages/community/TogetherPage";
import LoginPage from "./pages/member/LoginPage";
import RegisterPage from "./pages/member/RegisterPage";
import SocialRegisterPage from "./pages/member/SocialRegisterPage";
import BookmarkPage from "./pages/personal/BookmarkPage";
import CartPage from "./pages/personal/CartPage";
import MessagePage from "./pages/personal/MessagePage";
import MyPage from "./pages/personal/MyPage";
import PaymentPage from "./pages/personal/PaymentPage";
import PaySucTestPage from "./pages/personal/PaySucTestPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import AuthLogic from "./util/authLogic";
import firebaseApp from "./util/firebase";

function App({authLogic}) {
  const [user, setUser] = useState();
  const [domain, setDomain] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function App({authLogic, imageUploader}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = sessionStorage;
  const toastStatus = useSelector((state) => state.toastStatus);
  // 회원 가입 정보 DB 비교
  /*
  useEffect(() => {
    const asyncDB = async () => {
      const auth = authLogic.getUserAuth();
      // 현재 인증된 사용자 정보를 가져온다
      const user = await onAuthChange(auth);
      //사용자가 있으면 - userId가 있다.
      //구글 로그인으로 사용자 정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다 - email
      if (user) {
        console.log("user의 정보가 존재합니다");
        session.setItem("email", user.email);
        // util > dbLogic.js 생성 필요
        const res = await memberListDB({ mem_uid: user.uid, type: "auth" });
        console.log(res.data)
        // DB 테이블에 비교하는 컬럼값이 존재하면 세션에 담는다
        if (res.data!==0) { //Controller/memberList - 1)0, 2){mem_uid:}
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          session.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          session.setItem("status", jsonDoc[0].MEM_STATUS);
          session.setItem("auth", jsonDoc[0].MEM_AUTH);
          session.setItem("no", jsonDoc[0].MEM_NO);
          //navigate("/");
          return; // 렌더링 종료
        }
       // 네이버, 카카오 API 계정 로그인 (추후 구현)
        //다른 계정으로 로그인을 시도 했을 땐 user.emailVerified가 없음 -> undefined
        if(!user.emailVerified){
          navigate("/auth/emailVerified")
        }
        //DB 테이블에 비교하는 컬럼값이 없는 경우 회원가입 유도
        else {
          console.log("가입되지 않은 회원입니다. 회원가입 해 주세요.")
          navigate("/auth/signup")
        }
      }
      //사용자 정보가 없을때
      else {
        console.log("user의 정보가 없습니다");
        if (sessionStorage.getItem("email")) {
          //sessionStorage에 있는 값 모두 삭제하기
          sessionStorage.clear();
          window.location.reload();
        }
      } //end of else
    }
    asyncDB();
  }, [dispatch]);
  */
  }
  useEffect(() => {
    console.log(user);
  }, [user]);

  // pages로 routing 처리
  return (
    <>
      <Routes>
        {/* LoginMenu Routes */}
        <Route path="/register" exact={true} element={<RegisterPage authLogic={authLogic} />} />
        <Route
          path="/socialregister"
          exact={true}
          element={<SocialRegisterPage />}
        />
        <Route
          path="/login"
          exact={true}
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route
          path="/oauth/login/naver/callback"
          element={<NaverLogin setUser={setUser} />}
        />
        <Route
          path="/oauth/login/kakao/callback"
          element={<KakaoLogin setUser={setUser} />}
        />

        {/* PersonalTabs Routes */}
        <Route path="/mypage" exact={true} element={<MyPage />} />
        <Route path="/cart" exact={true} element={<CartPage />} />
        <Route path="/ticket" exact={true} element={<TicketPage />} />
        <Route path="/bookmark" exact={true} element={<BookmarkPage />} />
        <Route path="/setting" exact={true} element={<SettingPage />} />

        {/* MenuBar Routes */}
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/search" exact={true} element={<SearchResultPage />} />
        <Route path="/concert" exact={true} element={<ConcertPage />} />
        <Route path="/together" exact={true} element={<TogetherPage />} />
        <Route path="/carpool" exact={true} element={<CarpoolPage />} />
        <Route path="/donation" exact={true} element={<DonationPage />} />
        <Route path="/calendar" exact={true} element={<CalendarPage />} />
        <Route path="/message" exact={true} element={<MessagePage />} />
        <Route path="/message" exact={true} element={<MessagePage />} />

        {/* 상품 - 은영 수정중 */}
        <Route path="/festival" exact={true} element={<FestivalPage />} />
        <Route path="/addProducts" exact={true} element={<AddProductsPage />} />
        <Route path="/productsDetail/:id" element={<ProductsDetails />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/paysuctest" element={<PaySucTestPage />} />


        {/* TogetherPage Routes*/}
        <Route path="together/write/*" element={<Write />} />
        <Route path="together/boardDetail/" element={<BoardDetail/>} />
      </Routes>
    </>
  );
}

export default App;