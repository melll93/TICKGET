import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import "./App.css";
import { memberListDB } from "./axios/member/memberLogic";
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
import DonationWriteForm from "./pages/donation/DonationWriteForm";
import DonationDetail from "./pages/donation/DonationDetail";
import LoginPage from "./pages/member/LoginPage";
import RegisterPage from "./pages/member/RegisterPage";
import SocialRegisterPage from "./pages/member/SocialRegisterPage";
import BookmarkPage from "./pages/personal/BookmarkPage";
import CartPage from "./pages/personal/CartPage";
import MyPage from "./pages/personal/MyPage";
import PaySucTestPage from "./pages/personal/PaySucTestPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import AuthLogic, { onAuthChange } from "./util/authLogic";
import firebaseApp from "./util/firebase";

function App({ authLogic, imageUploader }) {
  const [domain, setDomain] = useState();
  const [boardNo, setBoardNo] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = sessionStorage;
  const toastStatus = useSelector((state) => state.toastStatus);
  
  // 회원 가입 정보 DB 비교
  /*
  useEffect(() => {
    const asyncDB = async () => {
      const auth = authLogic.getUserAuth(); // 인증된 사용자 정보 가져오기
      const user = await onAuthChange(auth); // 구글 로그인 user 정보를 가지고 있는 경우 sessionStorage 담음
      if (user) {
        console.log("user의 정보가 존재합니다");
        session.setItem("email", user.email);
        const res = await memberListDB({ mem_uid: user.uid, type: "auth" });
        console.log(res.data)
        // DB 테이블에 비교하는 컬럼값이 존재하면 세션에 담는다
        if (res.data!==0) { // Controller/memberList - 1)0, 2){mem_uid:}
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          session.setItem("no", jsonDoc[0].MEMBER_NO); // 채번된 사용자 번호 
          session.setItem("name", jsonDoc[0].MEMBER_NAME); // 사용자 이름
          session.setItem("email", jsonDoc[0].MEMBER_EMAIL); // 사용자 이메일
          //navigate("/");
          return; // 렌더링 종료
        }
       // 네이버, 카카오 API 계정 로그인 (추후 구현)
        //다른 계정으로 로그인을 시도 했을 땐 user.emailVerified가 없음 -> undefined
        if(!user.emailVerified){
          //navigate("/auth/emailVerified")
        }
        //DB 테이블에 비교하는 컬럼값이 없는 경우 회원가입 유도
        else {
          console.log("가입되지 않은 회원입니다. 회원가입 해 주세요.")
          navigate("/register")
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
}
*/
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
        {/* <Route path="/chat" exact={true} element={<ChatPage />} /> */}

        {/* 상품 - 은영 수정중 */}
        <Route path="/festival" exact={true} element={<FestivalPage />} />
        <Route path="/addProducts" exact={true} element={<AddProductsPage />} />
        <Route path="/productsDetail/:festMId" element={<ProductsDetails />} />
        <Route path="/paymentsucess/:festMId" element={<PaySucTestPage />} />

        {/* TogetherPage Routes*/}
        <Route path="together/write/*" element={<Write />} />
        <Route
          path="together/boardDetail/:boardNo"
          element={<BoardDetail boardNo={boardNo} />}
        />
        <Route path="together/boardDetail/" element={<BoardDetail />} />

        {/* DonationPage Routes - 성훈 작업중 */}
        <Route
          path="/donation/write"
          exact={true}
          element={<DonationWriteForm />}
        />
        <Route
          path="/donation/detail"
          exact={true}
          element={<DonationDetail />}
        />
      </Routes>
    </>
  );
}
export default App;
