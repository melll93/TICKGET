import React from "react";
import CenterSample from "../../components/CenterSample";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";

const BookmarkPage = () => {
  return (
    <>
      <Gnb />
      <Sidebar />
      <div className="center">bookmark</div>
    </>
  );
};

export default BookmarkPage;
