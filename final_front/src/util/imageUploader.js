import axios from "axios";


/* 인서트 */
export const handleUpload = async (selectedFile, setCloudImg) => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
    const res = await axios.post(
      "http://localhost:8888/api/image-upload",
      formData
    );
    setCloudImg(res.data);
    console.log("완료");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

/* 딜리트 */
/* db에서 삭제될 때 클라우디너리에서도 삭제하기...  */
  export const handleDelete = (publicId) => {   //클라우디너리 저장시 고유 값이라고 함 
    axios.get(`http://localhost:8888/api/image-delete/${publicId}`)
      .then((response) => {
        console.log(response.data);
        // 삭제성공
      })
      .catch((error) => {
        console.error(error);
      });
  };
