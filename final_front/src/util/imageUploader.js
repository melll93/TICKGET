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
