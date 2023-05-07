package back.spring.final_back.member.handler;

import java.io.IOException;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import back.spring.final_back.member.jwt.TokenProvider;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final TokenProvider tokenProvider;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException {

    // login 성공한 사용자 목록.
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    log.info(oAuth2User.toString());

    String jwt = tokenProvider.createToken(authentication);

    String url = makeRedirectUrl(jwt);

    // log.info(url);

    if (response.isCommitted()) {
      logger.debug("응답이 이미 커밋된 상태입니다. " + url + "로 리다이렉트하도록 바꿀 수 없습니다.");
      return;
    }
    getRedirectStrategy().sendRedirect(request, response, url);
  }

  private String makeRedirectUrl(String token) {
//    return UriComponentsBuilder.fromUriString("http://localhost:3333/oauth2/redirect/" + token)
    return UriComponentsBuilder.fromUriString("http://13.125.123.166:3333/oauth2/redirect/" + token)
        .build().toUriString();
  }
}