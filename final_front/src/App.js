import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import "./App.css";
import { memberListDB } from "./axios/member/memberLogic";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWriteForm from "./pages/board/BoardWriteForm";
import AddProductsPage from "./pages/community/AddProductsPage";
import CalendarPage from "./pages/community/CalendarPage";
import CarpoolPage from "./pages/community/CarpoolPage";
import ConcertPage from "./pages/community/ConcertPage";
import MarketPage from "./pages/community/MarketPage";
import FestivalPage from "./pages/community/FestivalPage";
import HomePage from "./pages/community/HomePage";
import ProductsDetails from "./pages/community/ProductsDetails";
import SearchResultPage from "./pages/community/SearchResultPage";
import TogetherPage from "./pages/community/TogetherPage";
import MarketDetail from "./pages/market/MarketDetail";
import MarketUpdatePage from "./pages/market/MarketUpdatePage";
import MarketWriteForm from "./pages/market/MarketWriteForm";
import FindIdPage from "./pages/member/FindIdpage";
import LoginPage from "./pages/member/LoginPage";
import RegisterPage from "./pages/member/RegisterPage";
import ResetPwPage from "./pages/member/ResetPwPage";
import SocialRegisterPage from "./pages/member/SocialRegisterPage";
import BookmarkPage from "./pages/personal/BookmarkPage";
import CartPage from "./pages/personal/CartPage";
import ChatPage from "./pages/personal/ChatPage";
import MyPage from "./pages/personal/MyPage";
import PaySucTestPage from "./pages/personal/PaySucTestPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import { onAuthChange } from "./util/authLogic";

function App({ authLogic, imageUploader }) {
  const [domain, setDomain] = useState();
  const [boardNo, setBoardNo] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = sessionStorage;
  const toastStatus = useSelector((state) => state.toastStatus);

  // 회원 가입 정보 DB 비교
  useEffect(() => {
    // 의존성 배열에 있는 변수(함수)가 훅이 변할 때마y다 다시 호출
    const asyncDB = async () => {
      console.log("asyncDB");
      const auth = authLogic.getUserAuth();
      const user = await onAuthChange(auth);
      //구글 로그인으로 사용자 정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다 - email
      if (user) {
        console.log("user 정보 존재");
        // sessionStorage에 이메일 주소 등록(단, 구글 로그인이 되어있을 때)
        session.setItem("id", user.id);
        const res = await memberListDB({ mem_id: user.id, type: "auth" });
        console.log(res.data);
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if (res.data !== 0) {
          //스프링부트 - RestMemberController - memberList - 1)0, 2){mem_uid:asdasd}
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          session.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          session.setItem("no", jsonDoc[0].MEM_NO);
          //navigate("/");
          return; //렌더링이 종료됨
        }
        // 구글 계정이 아닌 계정으로 로그인 -> 존재하지 않음
        if (!user.emailVerified) {
          navigate(""); //
        }
        //오라클 서버의 회원집합에 uid가 존재하지 않는 경우
        else {
          console.log(
            "해당 계정은 회원가입 대상입니다. 회원가입 부탁드립니다."
          );
          navigate("");
        }
      }
      //사용자 정보가 없을때
      else {
        console.log("user정보가 없을때");
        if (sessionStorage.getItem("id")) {
          //sessionStorage에 있는 값 모두 삭제하기
          sessionStorage.clear();
          window.location.reload();
        }
      } //end of else
    };
    asyncDB(); // 함수 호출
  }, [dispatch]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  // pages로 routing 처리
  return (
    <>
      <Routes>
        {/* LoginMenu Routes */}
        <Route
          path="/register"
          exact={true}
          element={<RegisterPage authLogic={authLogic} />}
        />
        <Route
          path="/socialregister"
          exact={true}
          element={<SocialRegisterPage />}
        />
        <Route
          path="/login"
          exact={true}
          element={
            <LoginPage user={user} setUser={setUser} authLogic={authLogic} />
          }
        />
        <Route path="/findId" exact={true} element={<FindIdPage />} />
        <Route
          path="/resetPw"
          exact={true}
          element={<ResetPwPage authLogic={authLogic} />}
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
        <Route path="/market" exact={true} element={<MarketPage />} />
        <Route path="/calendar" exact={true} element={<CalendarPage />} />
        <Route path="/chat" exact={true} element={<ChatPage />} />

        {/* 상품 - 은영 수정중 */}
        <Route path="/festival" exact={true} element={<FestivalPage />} />
        <Route path="/addProducts" exact={true} element={<AddProductsPage />} />
        <Route path="/productsDetail/:festMId" element={<ProductsDetails />} />
        <Route path="/paymentsucess/:festMId" element={<PaySucTestPage />} />

        {/* TogetherPage Routes*/}
        <Route path="together/write/*" element={<BoardWriteForm />} />
        <Route path="together/boardDetail/:boardNo" element={<BoardDetail boardNo={boardNo} />}/>
        <Route path="together/boardDetail/" element={<BoardDetail />} />

        {/* MarketPage Routes - 성훈 작업중 */}
        <Route
          path="/market/write"
          exact={true}
          element={<MarketWriteForm />}
        />
        <Route
          path="/market/update/:bno"
          exact={true}
          element={<MarketUpdatePage />}
        />
        <Route
          path="/market/detail/:bno"
          exact={true}
          element={<MarketDetail />}
        />
      </Routes>
    </>
  );
}
export default App;
