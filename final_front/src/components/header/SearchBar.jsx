import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/mainhomepage.css";


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
    <div className="SearchBarDiv"  style={{marginTop:'12px'}} >

<input
     id="SearchBar"
      type="text"
      className="searchbar"
      placeholder="Search..."
      onChange={onChange}
    />
     <img
        className="image50"
        src="/logos/SEARCH.png"
        onClick={search}
      />

    </div>
  );
};

export default SearchBar;

