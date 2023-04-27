import axios from "axios";

/* 
const [cloudImage, setCloudImage] = useState({url:'', publicId:''});

    const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePublicIdChange = (e) => {
    setPublicId(e.target.value);
  };


리턴 

    <div>
      <input type="file" onChange={handleImageChange} />
      <input type="text" value={publicId} onChange={handlePublicIdChange} />
      <button onClick={handleImageUpload}>Upload</button>
      <button onClick={handleImageDelete}>Delete</button>
    </div>

*/




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
  export const handleDelete = (cloudImg) => {   //클라우디너리 저장시 고유 값이라고 함 
    axios.get(`http://localhost:8888/api/image-delete/${cloudImg}`)
      .then((response) => {
        console.log(response.data);
        // 삭제성공
      })
      .catch((error) => {
        console.error(error);
      });
  };
