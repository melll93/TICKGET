package back.spring.final_back.member.service;

import back.spring.final_back.member.repository.MemberDto;

import java.util.Map;

public interface MemberService {
    public Object localMemberLogin(MemberDto memberDto);
    public MemberDto searchById();

    public boolean checkIdExist();
    public boolean checkNicknameExist();
    public boolean checkEmailExist();
}
