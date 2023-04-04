import React from 'react'
import { Navbar } from "react-bootstrap";

const Footer = () => {
    return (
        <>
          <Navbar
            fixed="bottom"
            className="navbar navbar-expand-sm bg-light justify-content-center"
            bg="dark"
            style={{ color: "white" }}
          >
           Copyright &copy;2023
          </Navbar>
        </>
      );
    };

export default Footer