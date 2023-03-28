import React from 'react'

const SignUpPage = () => {
/* 회원가입 birth 날짜 선택기 */
const today = new Date();
const endDay = new Date( today.getFullYear(), today.getMonth(), today.getDate() );

$('[name=birth]').datepicker({
	dateFormat: 'yy-mm-dd',
	changeYear: true,
	changeMonth: true,	
	showMonthAfterYear: true,
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	maxDate: endDay
	//beforeShowDay: after	//오늘 이후로 선택 못하게 하는 함수
});

$('[name=birth]').change(function() {
	$('#delete').css('display', 'inline-block');
});

$('#delete').click(function(){
	$('[name=birth]').val('');
	$('#delete').css('display', 'none');
});

function after(date) {
	if(date > new Date()) {
		return [false];
	} else {
		return [true];
	}
}
/* end 날짜 선택기 */
  return (
    <div>
      <SignupForm suggested={false}>
      {/* 아이디 */}
      <div style={{display: 'flex' , flexWrap: 'wrap'}}>
        <MyLabel> 아이디 <span style={{color:"red"}}>{star.id}</span>
          <MyInput type="text" id="id" placeholder="아이디를 입력해주세요" 
                    onChange={(e)=>{changeMemInfo(e); validate('id', e);}}/>
                    <MyLabelAb>{comment.id}</MyLabelAb>
        </MyLabel>
        <MyButton type="button" onClick={()=>{overlap('id');}}>중복확인</MyButton>
      </div>
      {/* 비밀번호 */}
      <MyLabel> 비밀번호 <span style={{color:"red"}}>{star.password}</span>
        <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해주세요" 
                onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                onChange={(e)=>{changeMemInfo(e);  validate('password', e);}}/>
        <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
        </div>
        <MyLabelAb>{comment.password}</MyLabelAb>
        </MyLabel>

        <MyLabel> 비밀번호 확인 <span style={{color:"red"}}>{star.password2}</span>
        <MyInput type={passwordType[1].type} id="password2"  autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={(e)=>{changeMemInfo(e); validate('password2', e.target.value)}}/>
        <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
        </div>
        <MyLabelAb>{comment.password2}</MyLabelAb>
        </MyLabel>         
      
      {/* 이름 */}
      <div style={{padding: '30px 30px 0px 30px'}}>
        <MyLabel> 이름 <span style={{color:"red"}}>{star.name}</span>
          <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해주세요" 
          onChange={(e)=>{changeMemInfo(e); validate('name', e);}}/>
          <MyLabelAb>{comment.name}</MyLabelAb>
        </MyLabel>
      {/* 닉네임 */}
        <MyLabel> 닉네임 <span style={{color:"red"}}>{star.nickname}</span>
          <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요" 
          onChange={(e)=>{changeMemInfo(e); validate('nickname', e);}}/>
          <MyLabelAb>{comment.nickname}</MyLabelAb>
        </MyLabel>
        <MyButton type="button" onClick={()=>{overlap('nickname')}}>중복확인</MyButton>
      {/* 이메일 */}
      <MyLabel> 이메일 <span style={{color:"red"}}>{star.email}</span>
        <MyInput type="email" id="email" placeholder="이메일를 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('email', e);}}/>
        <MyLabelAb>{comment.email}</MyLabelAb>
      </MyLabel>
      <MyButton type="button" onClick={()=>{overlap('email');}}>중복확인</MyButton>
      {/* 전화번호 */}
      <MyLabel> 전화번호 <span style={{color:"red"}}>{star.mobile}</span>
        <MyInput type="text" id="mobile" defaultValue={memInfo.mobile} placeholder="전화번호를 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('hp', e);}} />
        <MyLabelAb>{comment.mobile}</MyLabelAb>
      </MyLabel>
      {/* 성별 */}
      <MyLabel style={{margin:0}}> 성별
        <div style={{marginTop:10}} key={`inline-radio`} className="mb-3">
          {Checkbox}
        </div>
      </MyLabel>
      {/* 생년월일 */}
      {/* <input type="text" name="birth" readonly />
				<span id="delete" style="color: red; position: relative; right: 25px; display: none;"><i class="fas fa-times font-img"></i></span> */}
      <MyLabel> 생년월일 <span style={{color:"red"}}>{star.birthday}</span>
        <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요" 
        onChange={(e)=>{changeMemInfo(e); validate('birthday', e);}}/>
        <MyLabelAb>{comment.birthday}</MyLabelAb>
      </MyLabel>
      </div>
      </SignupForm>
    </div>
    
  )
}

export default SignUpPage