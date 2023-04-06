import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectBoardDetailDB, updateBoardListDB } from "../../axios/board/boardLogic";
import QuillEditor from "./QuillEditor";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../../styles/formStyle";
import { Form } from "react-bootstrap";
import MyFilter from "./MyFilter";

const BoardUpdate = () => {
  const naviagte = useNavigate();
  //해시값으로 가져오기
  //쿼리스트링 가져오기
  //props로 가져오기
  const { boardTgNo } = useParams(); //해시값
  console.log("detail의 boardThNo :"+boardTgNo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [secret, setSecret] = useState(false);
  const [tTitle, setTTitle] = useState("일반");
  const [types] = useState(["일반", "결제", "양도", "회원", "수업"]);
  const quillRef = useRef();

  useEffect(() => {
    //한 건 가져오기
    const BoardDetail = async () => {
      const board = {
        boardTgNo: boardTgNo,
      };
      const res = await selectBoardDetailDB(board);
      const temp = JSON.stringify(res.data); //문자열 전환
      console.log(temp);
      const jsonDoc = JSON.parse(temp); // 배열로 접근처리
      setTitle(jsonDoc[0].boardTgTitle);
      setContent(jsonDoc[0].boardTgContent);
      //여기서 parse는 'true'를 boolean true변경
      setSecret(JSON.parse(jsonDoc[0].boardTgSecret));
      setTTitle(jsonDoc[0].boardTgType);
      //작성자가 아닌데? 수정해도 되나?
      if (jsonDoc[0].MEM_NO !== sessionStorage.getItem("no")) {
        //글에 회원번호와 로그인한 no가 달라? 네 -> 다른사람글
        return console.log("작성자가 아닙니다.");
      }
    };
    BoardDetail();
  }, [boardTgNo]);

  const boardUpdate = async() => {
    if(title.trim()===''||content.trim()==='')return console.log('게시글이 수정(작성)되지 않았다.')

    const board ={
        boardTgTitle: title, // 제목 추가
        boardTgContent: content, // 내용 추가
        boardTgSecret: (secret ? 'true':'false'),
        boardTgType: tTitle,
        boardTgMemId: sessionStorage.getItem('id'),
    }

    console.log("디테일의 board? "+board)
    const res = await updateBoardListDB(board)
    console.log("디테일의 res.data? "+res.data)
    if(!res.data) return console.log('게시판 수정에 실패하였습니다.')
    naviagte("/together")
  }

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleFiles = useCallback((value) => {
    setFiles([...files, value]);
  },[files]);


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]); 

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  },[]);

  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>게시판 글수정</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2>
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px', alignItems: 'center'}}>
                  <span style={{fontSize: '14px'}}>비밀글</span>
                  <Form.Check type="switch" id="custom-switch" checked={secret===true?true:false} readOnly
                    style={{paddingLeft: '46px'}} onClick={()=>{setSecret(!secret)}}/>
                </div>
                <MyFilter types={types} id={"qna_type"} title={tTitle} handleTitle={handleTTitle}></MyFilter>
                <BButton style={{marginLeft: '10px'}} onClick={()=>{boardUpdate()}}>글수정</BButton>
              </div>
            </div>
            <input id="dataset-title" type="text" placeholder="제목을 입력하세요." defaultValue={title}
              style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr />
            <h3 style={{textAlign:"left", marginBottom:'10px'}}>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};


export default BoardUpdate;
