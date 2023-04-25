import React from "react";
import HomeButton from "./sidebar/HomeButton";
import SearchBar from "./header/SearchBar";
import "../styles/header.css";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { BlackLink } from "../styles/formStyle";

const Header = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData")


  const logout = () => {
    window.localStorage.clear();
    cookies.remove("_userData");
    // navigate("/"); // cookie가 갱신이 안됨
    window.location.href = "/";
  };


  return (
    <>
    <div className="header">
<div className="top_header">
  {_userData&&_userData!=null ?  <> <Link to="/" className="headerlink2" onClick={logout}>로그아웃</Link> |  <Link to="/mypage" className="headerlink2">마이페이지</Link> </>: <> <Link to="/login"  className="headerlink2">로그인</Link> |  <Link to="/register" className="headerlink2">회원가입</Link> </>}
</div>

<div className="main_haeder">
    <HomeButton />
<div className="topList" style={{fontFamily:"LeferiBaseBold"}}>
<Link to="/festival" className="headerlink"><strong>페스티벌</strong></Link>|<Link to="/together" className="headerlink" ><strong>함께가요</strong></Link>|<Link to="/market" className="headerlink"><strong>마켓</strong></Link>  
</div>

          <SearchBar />

        </div>

      </div>

    </>
  );
};

export default Header;
