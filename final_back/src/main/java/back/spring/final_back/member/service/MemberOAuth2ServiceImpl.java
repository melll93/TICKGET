package back.spring.final_back.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration.EnableTransactionManagementConfiguration.CglibAutoProxyConfiguration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import back.spring.final_back.member.repository.MemberDao;
import back.spring.final_back.member.repository.MemberDetails;
import back.spring.final_back.member.repository.MemberDto;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberOAuth2ServiceImpl extends DefaultOAuth2UserService {

        private final MemberDao memberDao;

        @Override
        public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
                // log.info("userRequest:" + userRequest);
                // log.info(userRequest.getAccessToken().toString());
                // log.info(userRequest.getClientRegistration().toString());
                OAuth2User user = super.loadUser(userRequest);
                Map<String, Object> attributes = user.getAttributes();
                /****************************************************************************************
                 * google : attributes => .get("sub") 가 id
                 * naver : attributes.get("response") => .get("id") 가 id
                 * kakao : attributes.get("id") => id,
                 * attributes.get("kakao_account").get("profile")
                 ****************************************************************************************/
                MemberDto resultMember = null;
                if (attributes.get("sub") != null) { // 구글 로그인 케이스
                        String id = attributes.get("sub").toString();

                        resultMember = logic(id, attributes, "google"); // attribute
                } else if (attributes.get("response") != null) { // 네이버 로그인 케이스
                        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
                        String id = response.get("id").toString();

                        resultMember = logic(id, response, "naver"); // attribute.response
                } else if (attributes.get("id") != null) { // 카카오 로그인 케이스
                        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");

                        String id = attributes.get("id").toString();
                        resultMember = logic(id, kakao_account, "kakao"); // attribute.kakao_account.profile
                }
                // log.info(user.toString());
                log.info(resultMember.toString());
                MemberDetails memberDetails = new MemberDetails(resultMember);

                return memberDetails;
        } // end of loadUser

        private MemberDto logic(String id, Map<String, Object> attributes, String domain) {
                log.info(id);
                log.info(attributes.toString());

                if (memberDao.getMemberData(id) != null) { // 가입 되있는 상태
                        return memberDao.getMemberData(id);
                } else { // 가입해야 함
                        MemberDto memberDto = new MemberDto();
                        memberDto.setMemberDomain(domain);
                        memberDto.setMemberAuthority("OAUTH2_USER");
                        if (domain == "google") {
                                memberDto.setMemberId(id);
                                memberDto.setMemberName(attributes.get("name").toString());
                                memberDto.setMemberEmail(attributes.get("email").toString());
                                memberDto.setMemberNickname(attributes.get("name").toString());
                                memberDto.setMemberProfileImage(attributes.get("picture").toString());
                        } else if (domain == "naver") {
                                memberDto.setMemberId(id);
                                memberDto.setMemberName(attributes.get("name").toString());
                                memberDto.setMemberEmail(attributes.get("email").toString());
                                memberDto.setMemberNickname(attributes.get("name").toString());
                        } else if (domain == "kakao") {
                                Map<String, Object> userProfile = (Map<String, Object>) attributes.get("profile");
                                memberDto.setMemberId(id);
                                memberDto.setMemberName(userProfile.get("nickname").toString());
                                memberDto.setMemberEmail(attributes.get("email").toString());
                                memberDto.setMemberNickname(userProfile.get("nickname").toString());
                                memberDto.setMemberProfileImage(userProfile.get("profile_image_url").toString());
                        }

                        memberDao.socialjoin(memberDto);
                        return memberDao.getMemberData(id);
                        // return memberDto;
                }

        }
}