import axios from "axios";
import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PaymentComponent from "./PaymentComponent";

const TicketPage = () => {  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post("http://localhost:8888/api/image-upload", formData);
      setImageURL(res.data);
      console.log("완료")
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        Ticket


은영 클라우디너리 연습중 
        <input type="file" onChange={handleFileInput} />
        <button onClick={handleUpload}>Upload</button>
      {imageURL && <img src={imageURL} alt="uploaded image" />}


<PaymentComponent></PaymentComponent>



      </div>
    </>
  );
};

export default TicketPage;
