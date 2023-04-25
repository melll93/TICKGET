/* global daum */
import React, { useState } from 'react'
import { BButton, SignupForm, MyH1, MyLabel, MyInput, PwEye, MyLabelAb, MyButton } from '../../styles/formStyle';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { checkPassword, validateEmail, validateHp, validateName, validatePassword } from '../../util/validateLogic';
import Swal from "sweetalert2";
import { memberListDB } from '../../axios/member/memberCrud';
import { Cookies } from "react-cookie";

/* 
회원 정보 수정 페이지 접속 시 사용자 ID -> 고정값
input 태그에 사용자 정보를 뿌려줄 수 있으면 뿌려주고 아니면 바꾸고 싶은 정보들만 입력하면 그 값들만 입력 받아서 DB 데이터값 변경
*/
const MemberUpdPage = () => {
  const cookies = new Cookies();
  const _userData = cookies.get("_userData"); // 사용자 정보
  console.log(_userData)

  const toggleHover = () => {
  }

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
      zipcode: ""
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
      email: "*",
      password: "*",
      password2: "*",
      name: "*",
      mobile: "*",
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
            console.log('중복된 이메일이 존재');
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
    // e.preventDefault();
  }

  return (
    <div>
      <div className='mypage_center' style={{paddingTop:'1050px'}}> 
        <SignupForm suggested={false}>
        <MyH1>회원 정보 수정</MyH1>
        <div style={{ padding: '30px 30px 0px 30px' }}>

          {/* 아이디 변경 불가*/}
            <div style={{display: 'flex'}}>
              <MyLabel> 아이디
                <MyInput type="text" id="id" style={{ backgroundColor: "rgb(112, 128, 144, 0.3)" }} readOnly value={_userData.memberId}/>
              </MyLabel>
            </div>

          {/* 비밀번호 */}
          <MyLabel> 비밀번호 <span style={{ color: "red" }}>{star.password}</span>
            <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="변경하실 비밀번호를 입력해 주세요"
              onKeyUp={(e) => { setComment({ ...comment, password2: checkPassword(e.target.value, memInfo.password2) }); }}
              onChange={(e) => { changeMemInfo(e); validate('password', e); }} />
            <div id="password" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[0].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password}</MyLabelAb>
          </MyLabel>

          <MyLabel> 비밀번호 확인 <span style={{ color: "red" }}>{star.password2}</span>
            <MyInput type={passwordType[1].type} id="password2" autoComplete="off" placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('password2', e.target.value) }} />
            <div id="password2" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[1].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password2}</MyLabelAb>
          </MyLabel>

          {/* 이름 */}
            <MyLabel> 이름 <span style={{ color: "red" }}>{star.name}</span>
              <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해 주세요" value={_userData.memberName}
                onChange={(e) => { changeMemInfo(e); validate('name', e); }} />
              <MyLabelAb>{comment.name}</MyLabelAb>
            </MyLabel>

            {/* 닉네임 변경 불가 */}
            <div style={{display: 'flex'}}>
              <MyLabel> 닉네임
                <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} readOnly value={_userData.memberNickname}
                  style={{ backgroundColor: "rgb(112, 128, 144, 0.3)" }} />
              </MyLabel>
            </div>

            {/* 이메일 */}
            <div style={{display: 'flex'}}>
            <MyLabel> 이메일 <span style={{ color: "red" }}>{star.email}</span>
              <MyInput type="email" id="email" placeholder="이메일를 입력해주세요" value={_userData.memberEmail}
                onChange={(e) => { changeMemInfo(e); validate('email', e); }} />
              <MyLabelAb>{comment.email}</MyLabelAb>
            </MyLabel>
              <MyButton type="button" onClick={() => { overlap('email'); }}>중복 확인</MyButton>
            </div>
            
            {/* 전화번호 */}
            <MyLabel> 전화번호 <span style={{ color: "red" }}>{star.mobile}</span>
              <MyInput type="text" id="mobile" defaultValue={memInfo.mobile} placeholder="전화 번호를 입력해 주세요" value={_userData.memberMobile}
                onChange={(e) => { changeMemInfo(e); validate('hp', e); }} />
              <MyLabelAb>{comment.mobile}</MyLabelAb>
            </MyLabel>

            {/* 주소(우편번호, 주소지) */}
            <MyLabel> 우편번호
                <MyInput type="text" id="zipcode" defaultValue={memInfo.zipcode} placeholder="우편번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e);}} />
                <MyLabelAb>{comment.zipcode}</MyLabelAb>
              </MyLabel>

              <div style={{display: 'flex'}}>
                <MyLabel> 주소
                  <MyInput type="text" id="address" defaultValue={post.address} readOnly placeholder="주소검색을 해주세요." />
                </MyLabel>
                <MyButton type="button" onClick={()=>{searchAddress()}}>검색</MyButton>
              </div>
              <MyLabel> 상세주소
                <MyInput type="text" id="addrDetail" defaultValue={post.addrDetail} readOnly={post.address?false:true}
                onChange={(e)=>{setPost({...post, addrDetail : e.target.value})}}/>
              </MyLabel>

            {/* 생년월일 변경 불가 */}
            <MyLabel> 생년월일
              <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} readOnly value={_userData.memberBirth}
                style={{ backgroundColor: "rgba(112, 128, 144, 0.3)" }} />
            </MyLabel>


            {/* 수정하기 버튼 */}
            <BButton
              onClick={handleUpdate} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              {'수정하기'}
            </BButton>
          </div>
        </SignupForm>
      </div>
    </div>
  )
}

export default MemberUpdPage