package back.spring.final_back.member.service;

import back.spring.final_back.member.repository.MemberDao;
import back.spring.final_back.member.repository.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberDao memberDao;

    @Override
    public Object localMemberLogin(MemberDto memberDto) {
        Object result = null;
//        MemberDto memberDto = new MemberDto();
//        memberDto.setMemberId(member.get("memberId").toString());
//        memberDto.setMemberPassword(member.get("memberPassword").toString());
        log.info(memberDto.toString());
        result = memberDao.localMemberLogin(memberDto);
        log.info(result.toString());
        return result;
    }

    @Override
    public MemberDto searchById() {
        return null;
    }
}
