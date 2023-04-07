import React, { useState } from "react";
import MapContainer from "./MapContainer";
import "./index.css"

function LandingPage() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // flexDirection: "column",
        }}
        className="inputForm"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={InputText}
        />
        <button type="submit">검색</button>
      </form>
      <br/>
      <MapContainer searchPlace={Place} />
    </>
  );
}

export default LandingPage;
