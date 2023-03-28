package back.spring.final_back.social.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.social.repository.NaverMemberDao;
import back.spring.final_back.social.repository.NaverMemberDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NaverMemberServiceImpl implements NaverMemberService {
    Logger logger = LoggerFactory.getLogger(NaverMemberServiceImpl.class);
    private final NaverMemberDao naverMemberDao;

    /************************************************************
     * 전송받은 Naver ID가 회원가입 되어있는지 안되어있는지 확인
     * 
     * @param naver 회원 양식,
     *              birthday + birthyear = birth 로 처리
     *              email @jr.naver.com =>> @naver.com 처리
     * @return 존재하면 NaverMemberDto, 존재하지 않으면 0
     ************************************************************/
    @Override
    public Object searchMemberbyId(String id) {
        logger.info("call NaverMemberServiceImpl.searchMemberbyId");
        Object result = null;
        try {
            NaverMemberDto nDto = naverMemberDao.searchMemberbyId(id);
            Map<String, Object> rMap = new HashMap<>();
            rMap.put("result", 0);
            rMap.put("msg", "login success");
            rMap.put("member", nDto);
            result = rMap;
            try {
                logger.info(result.toString());
            } catch (NullPointerException e) {
                logger.info(e.toString());
            }
        } catch (Exception e) {
            logger.info(e.toString());
            logger.info("존재하지 않는 ID 입니다.");
        } finally {
            if (result == null) {
                Map<String, Object> rMap = new HashMap<>();
                rMap.put("result", 0);
                rMap.put("msg", "login failed");

                result = rMap;
            }
        }
        return result;
    }

}
