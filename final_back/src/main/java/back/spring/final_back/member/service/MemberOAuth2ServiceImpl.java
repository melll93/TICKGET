package back.spring.final_back.member.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
public class MemberOAuth2ServiceImpl extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        log.info("userRequest:" + userRequest);
//        log.info(userRequest.getAccessToken().toString());
//        log.info(userRequest.getClientRegistration().toString());
        OAuth2User user = super.loadUser(userRequest);
        Map<String, Object> attributes = user.getAttributes();
/****************************************************************************************
 * google : attributes => .get("sub") 가 id
 * naver : attributes.get("response") => .get("id") 가 id
 * kakao : attributes.get("id") => id, attributes.get("kakao_account").get("profile")
 ****************************************************************************************/
//        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
//        String email = (String) kakao_account.get("email");
//
//        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        log.info(attributes.toString());
//        log.info(kakao_account.toString());
//        log.info(properties.toString());
        return user;
    }
}


