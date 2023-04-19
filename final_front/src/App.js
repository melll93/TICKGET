import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import MarketDetail from "./pages/board/market/MarketDetail";
import MarketUpdatePage from "./pages/board/market/MarketUpdatePage";
import MarketWriteForm from "./pages/board/market/MarketWriteForm";
import TogetherBoardDetail from "./pages/board/together/TogetherBoardDetail";
import TogetherBoardUpdate from "./pages/board/together/TogetherBoardUpdate";
import TogetherBoardWriteForm from "./pages/board/together/TogetherBoardWriteForm";
import FestivalPaymentPage from "./pages/festival/FestivalPaymentPage";
import FestivalsDetail from "./pages/festival/FestivalsDetail";
import FindIdPage from "./pages/member/FindIdpage";
import LoginPage from "./pages/member/LoginPage";
import RegisterPage from "./pages/member/RegisterPage";
import ResetPwPage from "./pages/member/ResetPwPage";
import SocialRegisterPage from "./pages/member/SocialRegisterPage";
import AddProductsPage from "./pages/menu/AddProductsPage";
import CalendarPage from "./pages/menu/CalendarPage";
import CarpoolPage from "./pages/menu/CarpoolPage";
import ChatPage from "./pages/menu/ChatPage";
import ConcertPage from "./pages/menu/ConcertPage";
import FestivalPage from "./pages/menu/FestivalPage";
import HomePage from "./pages/community/HomePage";
import MarketPage from "./pages/menu/MarketPage";
import SearchResultPage from "./pages/menu/SearchResultPage";
import TogetherPage from "./pages/menu/TogetherPage";
import PayFailPage from "./pages/payment/PayFailPage";
import PaySucPage from "./pages/payment/PaySucPage";
import BookmarkPage from "./pages/personal/BookmarkPage";
import CartPage from "./pages/personal/CartPage";
import MyPage from "./pages/personal/MyPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import CarpoolDetail from "./pages/board/carpool/CarpoolDetail";
import CarpoolUpdate from "./pages/board/carpool/CarpoolUpdate";
import CarpoolWrietForm from "./pages/board/carpool/CarpoolWriteForm";
import ChangePwPage from "./pages/member/ChangePwPage";
import MarketPaymentPage from "./pages/personal/MarketPaymentPage";
import PaymentPage from "./pages/personal/PaymentPage";

function App({ mkImageUploader }) {
  const [board, setBoard] = useState();
  const [carpool, setCarpool] = useState();
  const [user, setUser] = useState();

  // pages로 routing 처리
  return (
    <>
      <Routes>
        {/* HomePage */}
        <Route path="/" exact={true} element={<HomePage />} />

        {/* LoginMenu Routes */}
        <Route path="/register" exact={true} element={<RegisterPage />} />
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
        <Route path="/findId" exact={true} element={<FindIdPage />} />
        <Route path="/resetPw" exact={true} element={<ResetPwPage />} />
        <Route path="/changePw" exact={true} element={<ChangePwPage />} />
        <Route
          path="/oauth/login/naver/callback"
          element={<NaverLogin user={user} setUser={setUser} />}
        />
        <Route
          path="/oauth/login/kakao/callback"
          element={<KakaoLogin user={user} setUser={setUser} />}
        />

        {/* PersonalTabs Routes */}
        <Route path="/mypage" exact={true} element={<MyPage />} />
        <Route path="/cart" exact={true} element={<CartPage />} />
        <Route path="/ticket" exact={true} element={<TicketPage />} />
        <Route path="/bookmark" exact={true} element={<BookmarkPage />} />
        <Route path="/setting" exact={true} element={<SettingPage />} />

        {/* MenuBar Routes */}
        <Route path="/search" exact={true} element={<SearchResultPage />} />
        <Route path="/concert" exact={true} element={<ConcertPage />} />
        <Route path="/together" exact={true} element={<TogetherPage />} />
        <Route path="/carpool" exact={true} element={<CarpoolPage />} />
        <Route path="/market" exact={true} element={<MarketPage />} />
        <Route path="/calendar" exact={true} element={<CalendarPage />} />
        <Route path="/chat" exact={true} element={<ChatPage />} />

        {/* 상품 - 은영 수정중 */}
        <Route path="/festival" exact={true} element={<FestivalPage />} />
        <Route path="/addProducts/:festMId" element={<AddProductsPage />} />
        <Route path="/productsDetail/:festMId" element={<FestivalsDetail />} />
        <Route path="/paymentsucess/:festMId" element={<PaySucPage />} />
        <Route path="/paymentfailed/:festMId" element={<PayFailPage />} />
        <Route path="/payment2/:festMId" element={<FestivalPaymentPage />} />

        {/* TogetherPage Routes*/}
        <Route path="together/write/*" element={<TogetherBoardWriteForm />} />
        <Route
          path="together/boardDetail/:boardTgNo"
          element={<TogetherBoardDetail board={board} />}
        />
        <Route path="together/boardDetail/" element={<TogetherBoardDetail />} />
        <Route
          path="together/boardUpdate/:boardTgNo"
          element={<TogetherBoardUpdate />}
        />

        {/* CarpoolPage Routes */}
        <Route path="carpool/write/*" element={<CarpoolWrietForm />} />
        <Route
          path="carpool/carpoolDetail/:boardCpNo"
          element={<CarpoolDetail carpool={carpool} />}
        />
        <Route path="carpool/carpoolDetail/" element={<CarpoolDetail />} />
        <Route
          path="carpool/carpoolUpdate/:boardCpNo"
          element={<CarpoolUpdate />}
        />
        <Route
          path="carpool/carpoolDetail/:carpoolNo"
          element={<CarpoolDetail carpool={carpool} />}
        />
        <Route path="carpool/carpoolDetail/" element={<CarpoolDetail />} />
        <Route
          path="carpool/carpoolUpdate/:carpoolNo"
          element={<CarpoolUpdate />}
        />

        {/* MarketPage Routes - 성훈 작업중 */}
        <Route
          path="/market/write"
          exact={true}
          element={<MarketWriteForm mkImageUploader={mkImageUploader} />}
        />
        <Route
          path="/market/update/:no"
          exact={true}
          element={<MarketUpdatePage mkImageUploader={mkImageUploader} />}
        />
        <Route
          path="/market/mk_boardDetail/*"
          element={<MarketDetail mkImageUploader={mkImageUploader} />}
        />
        <Route path="/payment/:no" element={<MarketPaymentPage />} />
      </Routes>
    </>
  );
}
export default App;
