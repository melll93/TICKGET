/* global daum */
import React, { useState } from 'react'
import { MyH1, MyLabel, MyInput, PwEye, MyLabelAb, MyButton } from '../../styles/formStyle';
import { checkPassword, validateEmail, validateHp, validateName, validatePassword } from '../../util/validateLogic';
import Swal from "sweetalert2";
import { memberListDB, memberUpdateDB } from '../../axios/member/memberCrud';
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MButton = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 24px;
  margin-bottom: 20px;
  border: none;
  background-color: rgb(80, 50, 200);
  color: white;
  &:hover {
    background-color: rgb(50, 50, 120);
  }
`;

export const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1000px;
  width: 160%;
  min-width: 350px;
  padding: 80px 30px 80px 30px;
  border-radius: 30px;
  margin: 150px 0px 150px 0px;
  border: 2px solid lightgrey;
`;

/* 
회원 정보 수정 페이지 접속 시 사용자 ID -> 고정값
input 태그에 사용자 정보를 뿌려줄 수 있으면 뿌려주고 아니면 바꾸고 싶은 정보들만 입력하면 그 값들만 입력 받아서 DB 데이터값 변경
*/
const MemberUpdPage = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); // 사용자 정보
  console.log(_userData)

  const navigate = useNavigate();


  // 비밀번호 
  const [passwordType, setPasswordType] = useState([
    {
      type: 'password',
      visible: false
    },
    {
      type: 'password',
      visible: false
    }
  ]);
  const passwordView = (event) => {
    const id = event.currentTarget.id;
    if (id === "password") {
      if (!passwordType[0].visible) {
        setPasswordType([{ type: 'text', visible: true }, passwordType[1]]);
      } else {
        setPasswordType([{ type: 'password', visible: false }, passwordType[1]]);
      }
    } else if (id === "password2") {
      if (!passwordType[1].visible) {
        setPasswordType([passwordType[0], { type: 'text', visible: true }]);
      } else {
        setPasswordType([passwordType[0], { type: 'password', visible: false }]);
      }
    }
  }

    // 주소
    const[post, setPost] = useState({
      zipcode: "",
      address: "",
      addrDetail: ""
    })
  
    // 수정 입력 정보
    const [memInfo, setMemInfo] = useState({
      email: "",
      password: "",
      password2: "",
      name: "",
      mobile: "",
      zipcode: "",
      address: "",
      addrDetail: ""
    });
  
    const [comment, setComment] = useState({
      email: "",
      password: "",
      password2: "",
      name: "",
      mobile: "",
      zipcode: ""
    });

    const [star, setStar] = useState({
      password: "*",
      password2: "*",
    })

    const searchAddress = () => {
      new daum.Postcode({
        oncomplete: function(data) {
          let address = ''; 
          if (data.userSelectedType === 'R') { 
            address = data.roadAddress;//도로명
          } else { 
            address = data.jibunAddress;//지번
          }
          console.log(data);
          console.log(address);
          console.log(post.zipcode);
          setPost({...post, zipcode:data.zonecode, address:address}) ;
          document.getElementById("zipcode").value = data.zonecode;
          document.getElementById("address").value = address;
          document.getElementById("addrDetail").focus();
        }
      }).open();
    }

    const changeMemInfo = (event) => {
      const id = event.currentTarget.id;
      console.log(id);
      const value = event.target.value;
      console.log(value);
      setMemInfo({ ...memInfo, [id]: value });
    }

    // 회원 수정 유효성 검사
  const validate = (key, e) => {
    let result;
    if (key === 'email') {
      result = validateEmail(e);
    }  else if (key === 'password') {
      result = validatePassword(e);
    } else if (key === 'password2') {
      result = checkPassword(memInfo.password, e);
    } else if (key === 'name') {
      result = validateName(e);
    } else if (key === 'mobile') {
      result = validateHp(e);
    } 
    setComment({ ...comment, [key]: result });
    if (result) {
      if (result === ' ') {
        setStar({ ...star, [key]: "" });
      } else {
        setStar({ ...star, [key]: "*" });
      }
    } else {
      setStar({ ...star, [key]: "" });
    }
  }

  const overlap = async (key) => {
    console.log('중복 확인 : ' + key);
    let params;
    if (key === 'email') {
        params = { memberEmail: memInfo[key] };
    }
    else {
        console.log('유효하지 않은 키 값입니다');
        return; // 유효하지 않을 시 함수 종료
    }

    console.log(params);

    let response = { data: 0 };
    response = await memberListDB(params);

    const data = JSON.stringify(response.data);
    const jsonDoc = JSON.parse(data);
    console.log('DB : ' + data);

    if (jsonDoc && jsonDoc.length > 0) {
        console.log('이메일 중복');
        if (key === 'email') {
            console.log('중복된 이메일 존재');
        }
        Swal.fire({
          title:'중복되는 이메일이 존재합니다. ',
          })
    }
    else {
        console.log('이메일 변경 가능');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { email, password, password2, name, mobile, zipcode, address, addrDetail } = memInfo;
  
    if (password !== password2) {
      // 비밀번호와 비밀번호 확인 값이 다른 경우
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        icon: "error",
      });
      return;
    }
    // 문제점 : 다른 값들은 update 되는데 주소지는 새로운 값을 넣어도 update 되지 않는 오류 발생
    try {
      const member = {
        memberId: _userData.memberId,
        memberPassword: password || "", // password 값이 없으면 빈 문자열로 설정
        memberName: name || "", // name 값이 없으면 빈 문자열로 설정
        memberEmail: email || "", // email 값이 없으면 빈 문자열로 설정
        memberMobile: mobile || "", // mobile 값이 없으면 빈 문자열로 설정
        memberZipcode: zipcode || "", // zipcode 값이 없으면 빈 문자열로 설정
        memberAddress: address || "", // 해당 값이 없다면 빈 문자열로 전달
        memberAddrDetail: addrDetail || "",
      };
      
      const res = await memberUpdateDB(member);
      console.log(res.data);
  
      Swal.fire({
        title: "회원 정보가 성공적으로 수정되었습니다.",
        icon: "success",
      });
  
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "회원 정보 수정에 실패하였습니다.",
        icon: "error",
      });
    }
  };
  

  return (
    <div>
      <div className='mypage_center' style={{paddingTop:'1050px'}}> 
      <UpdateForm>
        <MyH1>회원 정보 수정</MyH1>

          {/* 아이디 변경 불가*/}
            <div style={{display: 'flex'}}>
              <MyLabel style={{textAlign: 'left'}}> 아이디
                <MyInput type="text" id="id" style={{ backgroundColor: "rgb(112, 128, 144, 0.3)" }} readOnly value={_userData.memberId}/>
              </MyLabel>
            </div>

          {/* 비밀번호 */}
          <MyLabel style={{textAlign: 'left'}}> 비밀번호 <span style={{ color: "red" }}>{star.password}</span>
            <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="변경하실 비밀번호를 입력해 주세요"
              onKeyUp={(e) => { setComment({ ...comment, password2: checkPassword(e.target.value, memInfo.password2) }); }}
              onChange={(e) => { changeMemInfo(e); validate('password', e); }} />
            <div id="password" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[0].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password}</MyLabelAb>
          </MyLabel>

          <MyLabel style={{textAlign: 'left'}}> 비밀번호 확인 <span style={{ color: "red" }}>{star.password2}</span>
            <MyInput type={passwordType[1].type} id="password2" autoComplete="off" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('password2', e.target.value) }} />
            <div id="password2" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[1].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password2}</MyLabelAb>
          </MyLabel>

          {/* 이름 */}
            <MyLabel style={{textAlign: 'left'}}> 이름
              <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해 주세요" readOnly value={_userData.memberName}
                style={{ backgroundColor: "rgb(112, 128, 144, 0.3)" }} />
            </MyLabel>

            {/* 닉네임 변경 불가 */}
            <div style={{display: 'flex'}}>
              <MyLabel style={{textAlign: 'left'}}> 닉네임
                <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} readOnly value={_userData.memberNickname}
                  style={{ backgroundColor: "rgb(112, 128, 144, 0.3)" }} />
              </MyLabel>
            </div>

            {/* 이메일 */}
            <div style={{marginLeft: '80.5px'}}>
            <div style={{display: 'flex'}}>
            <MyLabel style={{textAlign: 'left'}}> 이메일
              <MyInput type="email" id="email" placeholder="이메일를 입력해주세요"
                onChange={(e) => { changeMemInfo(e); validate('email', e); }} />
              <MyLabelAb>{comment.email}</MyLabelAb>
            </MyLabel>
            <div style={{marginLeft: '2.5px'}} />
            <div>
              <MyButton type="button" onClick={() => { overlap('email'); }}>중복 확인</MyButton>
            </div>
            </div>
            </div>
            
            {/* 전화번호 */}
            <MyLabel style={{textAlign: 'left'}}> 전화번호
              <MyInput type="text" id="mobile" defaultValue={memInfo.mobile} placeholder="전화 번호를 입력해 주세요" 
                onChange={(e) => { changeMemInfo(e); validate('hp', e); }} />
              <MyLabelAb>{comment.mobile}</MyLabelAb>
            </MyLabel>

            {/* 주소(우편번호, 주소지) */}
            <MyLabel style={{textAlign: 'left'}}> 우편번호
                <MyInput type="text" id="zipcode" defaultValue={memInfo.zipcode} placeholder="우편번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e);}} />
                <MyLabelAb>{comment.zipcode}</MyLabelAb>
              </MyLabel>
              <div style={{marginLeft: '80.5px'}}>
              <div style={{display: 'flex'}}>
                <MyLabel style={{textAlign: 'left'}}> 주소
                  <MyInput type="text" id="address" defaultValue={post.address} readOnly placeholder="주소검색을 해주세요." />
                </MyLabel>
                <div/>
                <div>
                <MyButton type="button" onClick={()=>{searchAddress()}}>검색</MyButton>
                </div>
              </div>
              </div>
              <MyLabel style={{textAlign: 'left'}}> 상세주소
                <MyInput type="text" id="addrDetail" defaultValue={post.addrDetail} readOnly={post.address?false:true}
                onChange={(e)=>{setPost({...post, addrDetail : e.target.value})}}/>
              </MyLabel>

            {/* 생년월일 변경 불가 */}
            <MyLabel style={{textAlign: 'left'}}> 생년월일
              <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} readOnly value={_userData.memberBirth}
                style={{ backgroundColor: "rgba(112, 128, 144, 0.3)" }} />
            </MyLabel>


            {/* 수정하기 버튼 */}
            <MButton onClick={handleUpdate} >
              {'수정하기'}
            </MButton>
          </UpdateForm>
      </div>
    </div>
  )
}

export default MemberUpdPage