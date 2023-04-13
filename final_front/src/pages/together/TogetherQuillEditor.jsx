// import React, { useCallback, useEffect, useMemo } from "react";
// import ReactQuill from "react-quill";
// const TogetherQuillEditor = ({
//   value,
//   handleContent,
//   quillRef,
//   files,
//   handleFiles,
// }) => {
//   console.log(files);
//   console.log(Array.isArray(files));
//   const imageHandler = useCallback(() => {
//     console.log(files);
//     if (files.length > 2) {
//       return "이미지는 3장까지 업로드 가능합니다.";
//     }
//     const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
//     const input = document.createElement("input"); // input 태그를 동적으로 생성하기
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
//     input.setAttribute("name", "image");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const fileType = file.name.split(".");
//       console.log(fileType);
//       if (
//         !fileType[fileType.length - 1].toUpperCase().match("JPG") &&
//         !fileType[fileType.length - 1].toUpperCase().match("PNG") &&
//         !fileType[fileType.length - 1].toUpperCase().match("JPEG")
//       ) {
//         console.log("jpg png jpeg형식만 지원합니다.");
//       }
//       formData.append("image", file); // 위에서 만든 폼데이터에 이미지 추가
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }
//       // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
//       // const res = await uploadImageDB(formData);
//       // files.push(res.data);
//       // console.log(res.data); //xxx.png => wendy.png
//       // if (!res.data) {
//       //   console.log("이미지 업로드에 실패하였습니다.");
//       // }
//       // const url = `http://localhost:8888/board/imageGet?imageName=${res.data}`;
//       // const quill = quillRef.current.getEditor();
//       // const range = quill.getSelection().index;
//       // if (typeof range !== "number") return;
//       // quill.setSelection(range, 1);
//       // quill.clipboard.dangerouslyPasteHTML(
//       //   range,
//       //   `<img src=${url} style="width: 100%; height: auto;" alt="image" />`
//       // );
//     }; //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
//   }, [quillRef, files]);
//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           [
//             { header: [1, 2, 3, 4, 5, 6, false] },
//             { color: [] },
//             { align: [] },
//             { background: [] },
//           ],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [
//             { list: "ordered" },
//             { list: "bullet" },
//             { indent: "-1" },
//             { indent: "+1" },
//           ],
//           ["clean"],
//           ["link", "image"],
//         ],
//         handlers: {
//           image: imageHandler,
//         },
//       },
//     }),
//     [imageHandler]
//   );
//   useEffect(() => {
//     console.log("QuillEditor useEffect");
//   }, []);
//   console.log(value);

//   const formats = [
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "align",
//     "color",
//     "background",
//   ];
//   return (
//     <div
//       style={{
//         height: "550px",
//         display: "flex",
//         justifyContent: "center",
//         padding: "0px",
//       }}
//     >
//       <ReactQuill
//         ref={quillRef}
//         style={{ height: "470px", width: "100%" }}
//         theme="snow"
//         placeholder="본문 입력"
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={(content, delta, source, editor) => {
//           handleContent(editor.getHTML());
//         }}
//       />
//     </div>
//   );
// };
// export default TogetherQuillEditor;