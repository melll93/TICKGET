/* import React, { useState } from "react";
import MapContainer from "./MapContainer";

function LandingPage() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <br />
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
          style={{ width: "300px", height: "30px" }}
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          onKeyDown={handleKeyDown} // 추가된 부분
          value={InputText}
        />
        <button style={{ height: "30px" }} type="button" onClick={handleSubmit}>
          검색
        </button>
      </form>
      <br />
      <MapContainer searchPlace={Place} />
    </>
  );
}

export default LandingPage;
 */


