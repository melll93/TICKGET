package back.spring.final_back.member.controller;

import back.spring.final_back.member.repository.MemberDto;
import back.spring.final_back.member.service.MemberService;
import back.spring.final_back.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("http://localhost:3333")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {
    private final MemberService memberService;

    /************************************
     * Spring security login
     * :8888/login 에서 스프링이 로그인 처리,
     * 성공 시 => /member/login/success
     * 실패 시 => /member/login/failed
     * 
     * @return json web token 값
     ************************************/
    @PostMapping("/login/success")
    public Object loginSuccess() {
        log.info("success 호출");

        log.info(SecurityContextHolder.getContext().getAuthentication().toString());
        return memberService.loginSuccess();
    }

    @PostMapping("/login/failed")
    public Object loginFailed() {
        return null;
    }

    @GetMapping("/oauth/loginSuccess")
    public void oauthLoginSuccess() {
//        log.info(oauth.toString());
    }

    @PostMapping("/getMemberData")
    public Object getMemberData() {

        // log.info("getMemberData 호출");
        // String memberId = memberDto.getMemberId();
        // log.info(memberDto.toString());
        return memberService.getMemberData();
    }

    @GetMapping("/searchById")
    public MemberDto searchById(@RequestParam String memberId) {
        return memberService.searchById(memberId);
    }

    /*************************
     *
     * @param friendId
     * @return ifExist : true, ifNot : false
     */
    @GetMapping("/checkFollow")
    public boolean checkFollow(@RequestParam String friendId) {
        log.info(friendId);
        return memberService.checkFollow(friendId);
    }

    @GetMapping("/addFollow")
    public int addFollow(@RequestParam String friendId) {
        log.info(friendId);
        return memberService.addFollow(friendId);
    }

}
