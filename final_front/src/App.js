import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import KakaoLogin from "./api/login/KakaoLogin";
import NaverLogin from "./api/login/NaverLogin";
import AddProductsPage from "./pages/community/AddProductsPage";
import CarpoolPage from "./pages/community/CarpoolPage";
import ConcertPage from "./pages/community/ConcertPage";
import FestivalPage from "./pages/community/FestivalPage";
import HomePage from "./pages/community/HomePage";
import MarketPage from "./pages/community/MarketPage";
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
import PayFailPage from "./pages/personal/PayFailPage";
import PaySucPage from "./pages/personal/PaySucPage";
import PaymentPage from "./pages/personal/PaymentPage";
import SettingPage from "./pages/personal/SettingPage";
import TicketPage from "./pages/personal/TicketPage";
import CalendarPage from "./pages/personal/CalendarPage";
/* import PaySucPage from "./pages/personal/PaySucPage"; */
// import PayFailPage from "./pages/personal/PayFailPage";
import mkImageUploader from "./axios/market/mkImageUploader";
import TogetherBoardWriteForm from "./pages/together/TogetherBoardWriteForm";
import TogetherBoardDetail from "./pages/together/TogetherBoardDetail";
import TogetherBoardUpdate from "./pages/together/TogetherBoardUpdate";

import CarpoolWrietForm from "./pages/carpool/CarpoolWriteForm";
import CarpoolDetail from "./pages/carpool/CarpoolDetail";
import MarketPaymentPage from "./pages/personal/MarketPaymentPage";
import CarpoolUpdate from "./pages/carpool/CarpoolUpdate";

function App({ mkImageUploader }) {
  const [board, setBoard] = useState();
  const [carpool, setCarpool] = useState();
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
        <Route path="/paymentsucess/:festMId" element={<PaySucPage />} />
        <Route path="/paymentfailed/:festMId" element={<PayFailPage />} />

        <Route path="/payment/:festMId" element={<PaymentPage />} />

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
        <Route path="carpool/carpoolDetail/:boardCpNo" element={<CarpoolDetail  carpool={carpool }/>}/>
        <Route path="carpool/carpoolDetail/" element={<CarpoolDetail />} />
        <Route path="carpool/carpoolUpdate/:boardCpNo" element={<CarpoolUpdate />} />


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
        <Route
          path="/market/mk_boardDetail/payment/:payId"
          element={<MarketPaymentPage />}
        />
      </Routes>
    </>
  );
}
export default App;