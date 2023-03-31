import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import "./App.css";
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

function App({authLogic}) {
  const [user, setUser] = useState();
  const [domain, setDomain] = useState();
  const navigate = useNavigate();

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
        <Route path="together/write*" element={<Write />} />
      </Routes>
    </>
  );
}

export default App;
