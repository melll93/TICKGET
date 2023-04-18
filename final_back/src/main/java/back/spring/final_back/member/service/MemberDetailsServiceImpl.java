package back.spring.final_back.member.service;

import back.spring.final_back.member.repository.MemberDao;
import back.spring.final_back.member.repository.MemberDetails;
import back.spring.final_back.member.repository.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberDetailsServiceImpl implements UserDetailsService {

    private final MemberDao memberDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(username);

        MemberDto memberDto = memberDao.login(username);
        log.info(memberDto.toString());
        if (memberDto != null) {
            return new MemberDetails(memberDto);
        } else {
            return null;
        }
    }
}
