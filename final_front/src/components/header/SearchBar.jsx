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

<div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
          <input class="search_input" type="text" name="" placeholder="Search..." />
          <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
      </div>
    </div>


    </div>
  );
};

export default SearchBar;

