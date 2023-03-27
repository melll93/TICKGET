package back.spring.final_back.social.controller;

import back.spring.final_back.social.repository.NaverMemberDto;
import back.spring.final_back.social.service.NaverMemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3333")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/oauth/*")
public class NaverMemberController {
    Logger logger = LoggerFactory.getLogger(NaverMemberController.class);
    // private final NaverMemberService naverMemberService;

    /*****************************************************************
     *
     * @param naverMemberDto react로 조회한 프로필 Object 그대로 전송
     * @return DB에 회원이 조회되지 않으면 0 => 회원가입 창으로
     *         DB에 회원이 조회되면 1 => 로그인 Success, 메인페이지로
     *****************************************************************/
    @PostMapping("/login/naver/callback")
    public int NaverMemberLogin(@RequestBody NaverMemberDto naverMemberDto) {
        logger.info(naverMemberDto.toString());
        // int result = naverMemberService.getMemberbyId();
        return 0;
    }
}
