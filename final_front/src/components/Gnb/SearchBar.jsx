import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const onChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const search = () => {
    console.log(keyword);
    navigate("/search?s=" + keyword);
  };

  return (
    <div className="SearchBarDiv">
      <input
        id="SearchBar"
        className="SearchBar"
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
      />
      <img
        className="icon image20"
        src="../logos/SEARCH.png"
        onClick={search}
      />
    </div>
  );
};

export default SearchBar;
