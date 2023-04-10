class ImageUploader {
  async upload(file) {
    const data = new FormData();//외부 클라우드 시스템과 연동시에 꼭 필요한 객체
    data.append("file", file);
    data.append("upload_preset", "dpa186u8"); 
    const result = await fetch(
      "https://api.Cloudinary.com/v1_1/djxfvm2ev/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await result.json();
  }
}


export default ImageUploader;
//https://cloudinary.com/documentation/upload_images




// //addproducts 에서 사용중 
// const FestImageUpload = (e)=> {
//   festImage()                                        - 이미지 미리보기 변경 
//   const { files } = document.querySelector('#festivalsImg');
//   const imageFile = document.querySelector('#festivalsImg');
//   const filesa = imageFile.files;
//   console.log("Image file", filesa[0]);
//   const formData = new FormData();
//   formData.append("file", files[0]);
//   formData.append("upload_preset", "dpa186u8");// "본인 프리셋 업로드 네임"
//   const options = {
//     method: "POST",
//     body: formData,
//   };
//   return fetch(
//     "https://api.Cloudinary.com/v1_1/djxfvm2ev/image/upload",options)
//     //"https://api.Cloudinary.com/v1_1/본인 클라우드 네임/image/upload"
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res.secure_url);
//       const festImageUrl=res.secure_url;
//       localStorage.setItem('imageUrl', festImageUrl)     -로컬스토리지
//       console.log('페스트 이미지 유알엘 : '+festImageUrl)
//       setFestImageUrl(festImageUrl);
    
//     })
//     .catch((err) => console.log(err));

// };