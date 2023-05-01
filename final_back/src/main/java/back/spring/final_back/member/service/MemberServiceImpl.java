package back.spring.final_back.member.service;

import back.spring.final_back.member.jwt.TokenProvider;
import back.spring.final_back.member.repository.MemberDao;
import back.spring.final_back.member.repository.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberDao memberDao;
    private final TokenProvider tokenProvider;

    @Override
    public Object localMemberLogin(MemberDto memberDto) {
        Map<String, Object> result = new HashMap<>();

        if (memberDto.getMemberId() == null || memberDto.getMemberId() == "") {
            result.put("code", 0);
            result.put("msg", "ID를 입력해주세요.");
            return result;
        } else if (memberDto.getMemberPassword() == null || memberDto.getMemberPassword() == "") {
            result.put("code", 0);
            result.put("msg", "PASSWORD를 입력해주세요.");
            return result;
        } else {
            MemberDto user = memberDao.localMemberLogin(memberDto);
            if (user == null) {
                result.put("code", 0);
                result.put("msg", "일치하는 회원 정보가 없습니다.");
                return result;
            } else {
                result.put("code", 1);
                result.put("user", user);
            }
        }
        log.info(result.toString());
        return result;
    }

    @Override
    public Object loginSuccess() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        log.info(userDetails.getUsername());
        return tokenProvider.createToken(userAuth);
    }

    @Override
    public MemberDto getMemberData() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
//        log.info(userDetails.getUsername());
        String memberId = userDetails.getUsername();

        return memberDao.getMemberData(memberId);
    }

    @Override
    public boolean checkIdExist() {
        return false;
    }

    @Override
    public boolean checkNicknameExist() {
        return false;
    }

    @Override
    public boolean checkEmailExist() {
        return false;
    }

    @Override
    public MemberDto searchById(String memberId) {
        return memberDao.getMemberData(memberId);
    }

    @Override
    public boolean checkFollow(String friendId) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        String myId = userDetails.getUsername();

        try {
            memberDao.checkFollow(myId, friendId);
            return true;
        } catch (Exception e) {
            log.info(e.getMessage());
            return false;
        }
//        if(result == null){
//            return false;
//        } else {
//            log.info(result.toString());
//            return true;
//        }
    }

    @Override
    public int addFollow(String friendId) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        String myId = userDetails.getUsername();
        return memberDao.addFollow(myId, friendId);
    }

}
