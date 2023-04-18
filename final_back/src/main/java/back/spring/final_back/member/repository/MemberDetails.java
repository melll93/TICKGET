package back.spring.final_back.member.repository;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
// @RequiredArgsConstructor
public class MemberDetails implements UserDetails {

    private MemberDto memberDto;
    private Map<String, Object> attributes;

    public MemberDetails(MemberDto memberDto) {
        this.memberDto = memberDto;
    }

    public MemberDetails(MemberDto memberDto, Map<String, Object> attributes) {
        this.memberDto = memberDto;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return memberDto.getMemberAuthority();
            }
        });
        return collect;
    }

    @Override
    public String getUsername() {
        return memberDto.getMemberId();
    }

    @Override
    public String getPassword() {
        return memberDto.getMemberPassword();
    }

    public String getEmail() {
        return memberDto.getMemberEmail();
    }

    public String getProfileImg() {
        return memberDto.getMemberProfileImage();
    }

    public String getRealname() {
        return memberDto.getMemberName();
    }

    public String getNickname() {
        return memberDto.getMemberNickname();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
