   import React from 'react'
   import axios from 'axios';
   import styled from 'styled-components';
   
   const Dspan = styled.span`
   padding: 2px 5px 2px 5px;
   font-size: 14px;
   cursor: pointer;
   &:hover {
      border-bottom: 1px solid gray;
   }
   `
   const MarketBoardFileDetail = ({files}) => {
   console.log(files);
   return (
      <div style={{display:'block', border:'1px solid lightGray', borderRadius:'10px', minHeight:'60px', padding:'5px'}}>
      <div style={{textAlign:"left", padding: "2px 5px 2px 5px"}}>첨부사진</div>
         {
         files.map((item, index)=>(
            <div key={index}>
               <Dspan type='text' id='fileUpload' key={index}
               onClick={()=>{ axios({
                  method: 'GET',
                  url: process.env.REACT_APP_SPRING_IP+`reple/imageDownload?imageName=${item.FILE_NAME}`,                 
                  responseType: 'blob' // 가장 중요함
               }).then(response =>{      
                  console.log(response.data);  
                  const url = window.URL.createObjectURL(new Blob([response.data], 
                     { type: response.headers['content-type'] }));
                  const link = document.createElement('a');
                  link.href = url;
                  //link.setAttribute('download', 'img.jpg');
                  //선택한 파일명으로 다운로드 파일명이 결정됨
                  link.setAttribute('download', `${item.FILE_NAME}`);
                  document.body.appendChild(link);
                  link.click();
               })}}
               >
               {item.FILE_NAME}
               </Dspan>
            </div>
         ))
         }
      </div>
   );
   };
   
   export default MarketBoardFileDetail;