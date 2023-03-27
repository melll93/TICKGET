import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CalendarPage from "./pages/community/CalendarPage";
import CarpoolPage from "./pages/community/CarpoolPage";
import ConcertPage from "./pages/community/ConcertPage";
import DonationPage from "./pages/community/DonationPage";
import FestivalPage from "./pages/community/FestivalPage";
import HomePage from "./pages/community/HomePage";
import SearchResultPage from "./pages/community/SearchResultPage";
import TogetherPage from "./pages/community/TogetherPage";
import JoinPage from "./pages/member/JoinPage";
import LoginPage from "./pages/member/LoginPage";
import BookmarkPage from "./pages/personal/BookmarkPage";
import CartPage from "./pages/personal/CartPage";
import MessagePage from "./pages/personal/MessagePage";
import MyPage from "./pages/personal/MyPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import AddProductsPage from "./pages/community/AddProductsPage";
import ProductsDetails from "./pages/community/ProductsDetails";
import PaymentPage from "./pages/personal/PaymentPage";
import NaverLogin from "./api/login/NaverLogin";

function App() {
  const [user, setUser] = useState();
  const [domain, setDomain] = useState();
  const navigate = useNavigate();

  const setUserInfo = (param) => {
    const _user = param;
    setUser(_user);
  };

  const setLoginDomain = (param) => {
    const _domain = param;
    setDomain(_domain);
  };

  const token = window.localStorage.getItem("access_token");
  useEffect(() => {
    console.log(user);
  }, [token]);

  // pages로 routing 처리
  return (
    <>
      <Routes>
        {/* LoginMenu Routes */}
        <Route path="/join" exact={true} element={<JoinPage />} />
        <Route
          path="/login"
          exact={true}
          element={<LoginPage user={user} setUserInfo={setUserInfo} />}
        />
        <Route
          path="/oauth/login/naver/callback"
          element={<NaverLogin user={user} setUserInfo={setUserInfo} />}
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
        <Route
          path="/productsDetail/:id"
          element={
            <div>
              <ProductsDetails />
            </div>
          }
        />
        <Route path="/payment/:id" exact={true} element={<PaymentPage />} />
      </Routes>
    </>
  );
}

export default App;
