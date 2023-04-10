import React, { useState } from "react";
import MapContainer from "./MapContainer";
import { BButton, FormDiv } from "../../../styles/formStyle";

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
    <br/>
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
          value={InputText}
        />
        <BButton style={{ height: "30px" }} type="submit">
          검색
        </BButton>
      </form>
      <br />
      <MapContainer searchPlace={Place} />
    </>
  );
}

export default LandingPage;
