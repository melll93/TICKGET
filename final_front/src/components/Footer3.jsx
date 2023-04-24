import React from 'react'
import { Navbar } from "react-bootstrap";
import "../styles/footer.css";


const Footer3 = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">

            <span className="footer-logo-text">My Website</span>
          </div>
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#">홈</a>
              </li>
              <li className="footer-nav-item">
                <a href="#">서비스</a>
              </li>
              <li className="footer-nav-item">
                <a href="#">고객센터</a>
              </li>
              <li className="footer-nav-item">
                <a href="#">회사 소개</a>
              </li>
              


            </ul>
          </nav>
          <div className="footer-social">
          <a href="https://github.com/melll93/final_project">
<img style={{width:'60px' }} src="logos/GITHUB.png"></img>
</a>
<a href="https://www.figma.com/team_invite/redeem/JlqZbEVbWCSmha2notKsMG">
<img style={{width:'60px' }} src="logos/NOTION.png"></img>
</a>

<a href="https://docs.google.com/spreadsheets/d/1j2yesT_XvceSI1dL4wWJa7y_bUnH1C1rjeHUEFS2j40/edit#gid=0">
<img style={{width:'50px' }} src="logos/GOOGLE.png"></img>
</a>
          </div>
        </div>
        <div className="footer-bottom">
          
          <p className="footer-bottom-text">
            © 2023 My Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer3