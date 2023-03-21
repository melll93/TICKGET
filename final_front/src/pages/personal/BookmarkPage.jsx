import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const BookmarkPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Bookmark
      </div>
    </>
  );
};

export default BookmarkPage;
