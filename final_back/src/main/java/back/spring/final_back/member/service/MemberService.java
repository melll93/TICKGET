package back.spring.final_back.member.service;

import back.spring.final_back.member.repository.MemberDto;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

public interface MemberService {
    Object localMemberLogin(MemberDto memberDto);

    Object loginSuccess();

    boolean checkIdExist();

    boolean checkNicknameExist();

    boolean checkEmailExist();

    Object getMemberData();

    MemberDto searchById(String id);
}
