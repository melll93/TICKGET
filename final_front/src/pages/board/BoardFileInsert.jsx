import React from "react";

const BoardFileInsert = ({ files }) => {
  console.log(files);
  return (
    <div
      style={{
        display: "block",
        border: "1px solid lightGray",
        borderRadius: "10px",
        minHeight: "60px",
        padding: "5px",
      }}
    >
      <div style={{ textAlign: "left", padding: "2px 5px 2px 5px" }}>
        첨부사진
      </div>
      {files.map((item, index) => (
        <div type="text" id="fileUpload" style={{ padding: "5px" }} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default BoardFileInsert;
