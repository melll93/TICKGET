package back.spring.final_back.member.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.member.service.NaverMemberService;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3333")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/oauth/*")
public class NaverMemberController {
    Logger logger = LoggerFactory.getLogger(NaverMemberController.class);
    private final NaverMemberService naverMemberService;

    /*****************************************************************
     *
     * @param naverMemberDto react로 조회한 프로필 Object 그대로 전송
     * @return DB에 회원이 조회되지 않으면 0 => 회원가입 창으로
     *         DB에 회원이 조회되면 NaverMemberDto => 로그인 Success, 메인페이지로
     *****************************************************************/
    @PostMapping("/login/naver")
    public Object NaverMemberLogin(@RequestBody Map<String, Object> pMap) {
        logger.info("call NaverMemberController.NaverMemberLogin");

        Object result = 0;
        logger.info(pMap.toString());
        String id = pMap.get("id").toString();

        result = naverMemberService.searchMemberbyId(id);
        logger.info(result.toString());
        return result;
    }
}
