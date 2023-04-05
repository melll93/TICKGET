import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import "./App.css";
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
import PaymentPage from "./pages/personal/PaymentPage";

function App({ imageUploader }) {
  const [boardTgNo, setBoardTgNo] = useState();
  const [user, setUser] = useState();

  // pages로 routing 처리
  return (
    <>
      <Routes>
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
        <Route path="/payment/:festMId" element={<PaymentPage />} />


        {/* TogetherPage Routes*/}
        <Route path="together/write/*" element={<BoardWriteForm />} />
        <Route
          path="together/boardDetail/:boardTgNo"
          element={<BoardDetail boardTgNo={boardTgNo} />}
        />
        <Route path="together/boardDetail/" element={<BoardDetail />} />

        {/* MarketPage Routes - 성훈 작업중 */}
        <Route
          path="/market/write"
          exact={true}
          element={<MarketWriteForm />}
        />
        <Route path="/market/update/*" element={<MarketUpdatePage />} />
        <Route path="/market/mk_boardDetail/*" element={<MarketDetail />} />
      </Routes>
    </>
  );
}
export default App;
