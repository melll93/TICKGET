import React from "react";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const BookmarkPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Bookmark
      </div>
    </>
  );
};

export default BookmarkPage;
