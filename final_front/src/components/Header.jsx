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
  return (
    <>
    <div className="header">
<div className="top_header">
  {_userData===null ? <> <Link to="/" className="header2link">로그인</Link> |  <Link to="/" className="headerlink2">회원가입</Link>(일단대충박아놓음) </>: <> <Link to="/" className="headerlink2">로그아웃</Link> |  <Link to="/" className="headerlink2">마이페이지</Link>(일단대충박아놓음) </>}
</div>
<div className="main_haeder">
    <HomeButton />
<div className="topList">
<Link to="/festival" className="headerlink"><strong>페스티벌</strong></Link>|<Link to="/together" className="headerlink" ><strong>함께가요</strong></Link>|<Link to="/market" className="headerlink"><strong>당근티켓</strong></Link>  
</div>

      <SearchBar />
    
</div>
    
    </div>

    </>
  );
};

export default Header;
