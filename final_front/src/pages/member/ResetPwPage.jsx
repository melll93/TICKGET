import { useNavigate } from 'react-router-dom';
import { LoginForm, MyH1, MyInput, MyLabel  } from '../../styles/formStyle';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { memberListDB } from '../../axios/member/memberCrud';
import { setUserId } from "../../redux/userAuth/action"
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Swal from "sweetalert2";
import { MButton } from './RegisterPage';


const ResetPwPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [memInfo, setMemInfo] = useState({
    name: "",
    mobile: "",
    id: "",
  });

  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    console.log(`${id}: ${value}`);
    setMemInfo({ ...memInfo, [id]: value });
  };

  const handleResetPw = async (event) => {
    event.preventDefault();
    const member = {
      memberId: memInfo.id,
      memberName: memInfo.name,
      memberMobile: memInfo.mobile,
      type: "overlap",
    };
    console.log(member);
    const res = await memberListDB(member);
    console.log(res.data);
    if (!res.data || res.data.length === 0 || !res.data.some((data) => data.member_id === memInfo.id)) {
      console.log('회원 정보 없음');
      /* alert('회원가입되지 않은 아이디입니다'); */
      
Swal.fire({
  title:'회원가입되지 않은 아이디입니다.',
  icon:'warning'
  })
  
    } else {
      const memberData = res.data[0];
      if (
        memberData.member_id === memInfo.id &&
        memberData.member_name === memInfo.name &&
        memberData.member_mobile === memInfo.mobile
      ) {
        console.log("비밀번호 변경 성공");
        dispatch(setUserId(memberData.member_id));
        navigate("/changePw");
      } else {
        console.log("사용자 정보 확인 실패");
       /*  alert("회원 님의 사용자 정보를 다시 확인해 주세요."); */
        Swal.fire({
          title:'회원 님의 사용자 정보를 다시 확인해 주세요.',
          icon:'error'
          })
          
      }
    }
  }
  

  return (
    <div>
    <Header />
    <Sidebar />
    <div className='center'>
    <LoginForm >
      <MyH1>비밀번호 변경</MyH1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          Content: "center",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <MyLabel>
          {" "}
          아이디
          <MyInput
            type="text"
            id="id"
            placeholder="아이디를 입력해 주세요"
            onChange={(e) => {
              changeMemInfo(e);
            }}
          />
        </MyLabel>
        <MyLabel>
          {" "}
          이름
          <MyInput
            type="text"
            id="name"
            placeholder="이름을 입력해 주세요"
            onChange={(e) => {
              changeMemInfo(e);
            }}
          />
        </MyLabel>
        <MyLabel>
          {" "}
          전화번호
          <MyInput
            type="number"
            id="mobile"
            placeholder="전화번호를 입력해 주세요"
            onChange={(e) => {
              changeMemInfo(e);
            }}
          />
        </MyLabel>
        <MButton onClick={handleResetPw}>비밀번호 변경</MButton>
      </div>
    </LoginForm>
    </div>
    </div>
  );
};

export default ResetPwPage;
