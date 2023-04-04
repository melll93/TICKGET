import React from 'react'
import { Navbar } from 'react-bootstrap'

const MarketFooter = () => {
  return (
    <div>

  게시판 푸터
  <React.Fragment>
	  <Navbar fixed="bottom" className="navbar navbar-expand-sm bg-light justify-content-center" bg="dark" style={{ color: 'white' }}>
		자바캠프 Copyright &copy; 2023
	  </Navbar>
	</React.Fragment>      
    </div>
  )
}

export default MarketFooter
