/* global daum */
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import Header from "../../components/Header";
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword, validateId } from '../../util/validateLogic';
import { MyButton, MyH1, MyInput, MyLabel, MyLabelAb, PwEye, SignupForm, SubmitButton } from '../../styles/formStyle';
import { onAuthChange } from '../../util/authLogic';
import Swal from "sweetalert2";
import { memberInsertDB, memberListDB } from '../../axios/member/memberCrud';
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
`;

const RegisterPage = ({ authLogic }) => {
  const userAuth = useSelector(state => state.userAuth);
  const type = window.location.search.split('&')[0].split('=')[1];
  const navigate = useNavigate();


  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });
  const toggleHover = () => {
    if (submitBtn.hover) {
      setSubmitBtn({ ...submitBtn, hover: false, bgColor: 'rgb(220, 220, 220)' });
    } else {
      setSubmitBtn({ ...submitBtn, hover: true, bgColor: 'rgb(192, 192, 192)' });
    }
  }

  // 주소 번지
  const[post, setPost] = useState({
    zipcode: "",
    address: "",
    addrDetail: ""
  })

  // 회원가입 입력 정보
  const [memInfo, setMemInfo] = useState({
    id: "",
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    mobile: "",
    nickname: "",
    gender: "없음",
    zipcode: ""
  });

  const [comment, setComment] = useState({
    id: "",
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    mobile: "",
    nickname: "",
    zipcode: ""
  });
  // 필수 작성 항목
  const [star, setStar] = useState({
    id: "*",
    email: "*",
    password: "*",
    password2: "*",
    name: "*",
    mobile: "*",
    nickname: "*",
    birthday: "*"
  })
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

  const handleSignup = (event) => {
    signup()
  }

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
  const changeMemInfo = (event) => {
    console.log('changeMemInfo');
    const id = event.currentTarget.id;
    console.log(id);
    const value = event.target.value;
    console.log(value);
    setMemInfo({ ...memInfo, [id]: value });
  }

  // 가입 시 아이디, 이메일, 닉네임 DB 중복 확인 검사
  const overlap = async (key) => {
    console.log('중복 확인 : ' + key);
    let params;
    if (key === 'id') {
        params = { memberId: memInfo[key] };
    }
    else if (key === 'email') {
        params = { memberEmail: memInfo[key] };
    }
    else if (key === 'nickname') {
        params = { memberNickname: memInfo[key] };
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

    // 중복 비교 후 사용 여부 출력
    if (jsonDoc && jsonDoc.length > 0) {
      console.log('DB 중복값 O : 사용 불가');
      setComment({ ...comment, [key]: <span style={{ color: 'red' }}>이미 사용 중인 {key} 입니다. 변경해 주세요.</span> });
    } else {
      console.log('DB 중복값 X : 사용 가능');
      setComment({ ...comment, [key]: <span style={{ color: 'rgb(80, 50, 200)' }}>사용 가능한 {key} 입니다.</span> });
    }
  };
  
      
/*     if (jsonDoc && jsonDoc.length > 0) {
      if (key === 'id') {
        console.log('중복 아이디 존재');
        Swal.fire({
          title:'중복된 아이디가 존재합니다. 다른 아이디를 입력해주세요.',
        }); 
      } else if (key === 'email') {
        console.log('중복 이메일 존재');
        Swal.fire({
          title:'중복된 이메일이 존재합니다. 다른 이메일을 입력해주세요.',
        });
      } else if (key === 'nickname') {
        console.log('중복 닉네임 존재');
        Swal.fire({
          title:'중복된 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.',
        });
      }
      setComment({ ...comment, [key]: '' });
    } else {
      console.log('사용 가능');
      setComment({ ...comment, [key]: <span style={{ color: 'rgb(80, 50, 200)' }}>사용 가능한 {key} 입니다.</span> });
    }
  }; */

// 회원 가입 유효성 검사
  const validate = (key, e) => {
    let result;
    if (key === 'email') {
      result = validateEmail(e);
    } else if (key === 'id') {
      result = validateId(e);
    } else if (key === 'nickname') {
      result = validateNickname(e);
    } else if (key === 'password') {
      result = validatePassword(e);
    } else if (key === 'password2') {
      result = checkPassword(memInfo.password, e);
    } else if (key === 'name') {
      result = validateName(e);
    } else if (key === 'mobile') {
      result = validateHp(e);
    } else if (key === 'birthday') {
      result = validateBirthdate(e);
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
  // 다음 주소 찾기
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

  /* 회원 가입 */
  const signup = async () => {
    try {
      // 회원 가입 정보 기입 확인
      const checkMeminfo = ['id', 'password', 'name', 'email', 'gender', 'mobile', 'nickname', 'birthday'];
      const meminfoFields = checkMeminfo.filter(field => !memInfo[field]);
      if (meminfoFields.length > 0) {
        Swal.fire({
          title: '회원 정보를 모두 입력해 주세요.'
        });
        return;
      }
  
      const birth = memInfo.birthday;
      let birthday = '';
      if (birth !== '') {
        birthday = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
      }
  
      const datas = {
        memberId: memInfo.id,
        memberPassword: memInfo.password,
        memberName: memInfo.name,
        memberBirth: birthday,
        memberEmail: memInfo.email,
        memberGender: memInfo.gender,
        memberMobile: memInfo.mobile,
        memberNickname: memInfo.nickname,
        memberZipcode: post.zipcode,
        memberAddress: post.address,
        memberAddrDetail: post.addrDetail
      };
  
      const response = await memberInsertDB(datas);
      console.log(response);
      if (response.data !== 1) {
        return 'DB 오류: 관리자에게 연락바랍니다';
      }
  
      sessionStorage.clear();
      navigate('/');
      Swal.fire({
        title: 'Tickget 사이트 회원가입을 축하합니다.'
      });
    } catch (error) {
      console.log(`${error} 오류: 관리자에게 연락바랍니다`);
      Swal.fire({
        title: '회원 가입에 실패하였습니다.'
      });
    }
  };
  

  const checkboxLable = ['없음', '남자', '여자']
  const Checkbox = checkboxLable.map((item, index) => (
    <Form.Check inline label={item} value={item} name="group1" type='radio' checked={memInfo.gender === item ? true : false} readOnly
      id={`inline-radio-${item}`} key={index} onClick={(e) => { setMemInfo({ ...memInfo, gender: e.target.value }) }} />
  ))

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='center'>
        <SignupForm suggested={false}>
        <MyH1>
          <img
            src="../logos/tickget.png"
            style={{ width: "100px" }}
          />
          <span/>
          회원가입
        </MyH1>
        <div style={{ padding: '30px 30px 0px 30px' }}>
          {/* 아이디 */}
          <div style={{display: 'flex'}}>
            <MyLabel> 아이디 <span style={{ color: "red" }}>{star.id}</span>
              <MyInput type="text" id="id" placeholder="아이디를 입력해 주세요" 
                onChange={(e) => { changeMemInfo(e); validate('id', e); }} />
              <MyLabelAb>{comment.id}</MyLabelAb>
              <div id="id-available"/>
            </MyLabel>
            <MyButton type="button" onClick={() => { overlap('id'); }}>중복 확인</MyButton>
            </div>
          {/* 비밀번호 */}
          <MyLabel> 비밀번호 <span style={{ color: "red" }}>{star.password}</span>
            <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해 주세요"
              onKeyUp={(e) => { setComment({ ...comment, password2: checkPassword(e.target.value, memInfo.password2) }); }}
              onChange={(e) => { changeMemInfo(e); validate('password', e); }} />
            <div id="password" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[0].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password}</MyLabelAb>
          </MyLabel>

          <MyLabel> 비밀번호 확인 <span style={{ color: "red" }}>{star.password2}</span>
            <MyInput type={passwordType[1].type} id="password2" autoComplete="off" placeholder="비밀번호를 한번 더 입력해 주세요"
              onChange={(e) => { changeMemInfo(e); validate('password2', e.target.value) }} />
            <div id="password2" onClick={(e) => { passwordView(e) }} style={{ color: `${passwordType[1].visible ? "gray" : "lightgray"}` }}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
            <MyLabelAb>{comment.password2}</MyLabelAb>
          </MyLabel>

          {/* 이름 */}
            <MyLabel> 이름 <span style={{ color: "red" }}>{star.name}</span>
              <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해 주세요"
                onChange={(e) => { changeMemInfo(e); validate('name', e); }} />
              <MyLabelAb>{comment.name}</MyLabelAb>
            </MyLabel>
            {/* 닉네임 */}
            <div style={{display: 'flex'}}>
            <MyLabel> 닉네임 <span style={{ color: "red" }}>{star.nickname}</span>
              <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요"
                onChange={(e) => { changeMemInfo(e); validate('nickname', e); }} />
              <MyLabelAb>{comment.nickname}</MyLabelAb>
            </MyLabel>
              <MyButton type="button" onClick={() => { overlap('nickname') }}>중복 확인</MyButton>
            </div>
            {/* 이메일 */}
            <div style={{display: 'flex'}}>
            <MyLabel> 이메일 <span style={{ color: "red" }}>{star.email}</span>
              <MyInput type="email" id="email" placeholder="이메일를 입력해주세요"
                onChange={(e) => { changeMemInfo(e); validate('email', e); }} />
              <MyLabelAb>{comment.email}</MyLabelAb>
            </MyLabel>
              <MyButton type="button" onClick={() => { overlap('email'); }}>중복 확인</MyButton>
            </div>
            {/* 전화번호 */}
            <MyLabel> 전화번호 <span style={{ color: "red" }}>{star.mobile}</span>
              <MyInput type="text" id="mobile" defaultValue={memInfo.mobile} placeholder="전화 번호를 입력해 주세요"
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
                  <MyInput type="text" id="address" defaultValue={post.address} readOnly placeholder="주소검색을 해주세요."/>
                </MyLabel>
                <MyButton type="button" onClick={()=>{searchAddress()}}>검색</MyButton>
              </div>
              <MyLabel> 상세주소
                <MyInput type="text" id="addrDetail" defaultValue={post.addrDetail} readOnly={post.address?false:true}
                onChange={(e)=>{setPost({...post, addrDetail : e.target.value})}}/>
              </MyLabel>
            {/* 성별 */}
            <MyLabel style={{ margin: 0 }}> 성별
              <div style={{ marginTop: 10 }} key={`inline-radio`} className="mb-3">
                {Checkbox}
              </div>
            </MyLabel>

            {/* 생년월일 */}
            <MyLabel> 생년월일 <span style={{ color: "red" }}>{star.birthday}</span>
              <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요"
                onChange={(e) => { changeMemInfo(e); validate('birthday', e); }} />
              <MyLabelAb>{comment.birthday}</MyLabelAb>
            </MyLabel>

            {/* 회원가입 버튼 */}
            <MButton type="button" 
              onClick={handleSignup} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              {'가입하기'}
            </MButton>
          </div>
        </SignupForm>
      </div>
    </div>

  )
}

export default RegisterPage