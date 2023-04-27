import axios from "axios";
import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PaymentComponent from "../payment/PaymentComponent";

const TicketPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileInput = (e) => {
    console.log(e);
    setSelectedFile(e);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(
        "http://localhost:8888/api/image-upload",
        formData
      );
      setImageURL(res.data);
      console.log("완료");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageURL);

  return (
    <>
      <div className="cloudinary_image">
        <input type="file" onChange={(e)=>{handleFileInput(e.target.files[0])}} />
        <button onClick={handleUpload}>파일 저장</button>
        {<img src="" alt="uploaded image" />}
      {/*   {imageURL && <img src={imageURL} alt="uploaded image" />}
       */}
      </div>
    </>
  );
};

export default TicketPage;
