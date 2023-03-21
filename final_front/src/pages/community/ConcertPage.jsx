import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const ConcertPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Concert
      </div>
    </>
  );
};

export default ConcertPage;
