import React from 'react'
import { Navbar } from "react-bootstrap";

const Footer2 = () => {
    return (
        <>
          <Navbar
            fixed="bottom"
            className="navbar navbar-expand-sm bg-light justify-content-center"
            bg="dark"
            style={{ color: "white" }}
          >
            
            <div className="link_logos" style={{display:'inline'}}>

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
            <div>

            Copyright &copy;2023
            </div>
          </Navbar>
        </>
      );
    };

export default Footer2