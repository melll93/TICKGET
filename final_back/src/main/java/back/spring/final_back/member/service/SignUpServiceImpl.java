package back.spring.final_back.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import back.spring.final_back.member.controller.SingUpController;
import back.spring.final_back.member.repository.SignUpDao;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignUpServiceImpl implements SignUpService {
	private final SignUpDao signUpDao;
	// 비밀번호 시큐리티 작업
    private final PasswordEncoder passwordEncoder;

	// 전체 조회
	@Override
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		log.info("memberList 확인");
		List<Map<String, Object>> mList = null;
		mList = signUpDao.memberList(pMap);
		log.info(mList.toString());
		return mList;
	}

	// Insert
	@Override
	public int memberInsert(Map<String, Object> pMap) {
		log.info("memberInsert 확인");
		int result = 0;
		String memberPassword = (String) pMap.get("memberPassword");
		String memberPasswordEncoded = passwordEncoder.encode(memberPassword);
		pMap.put("memberPassword", memberPasswordEncoded);
		result = signUpDao.memberInsert(pMap);
		return result;
	}

	// 회원 정보 Update
	@Override
	public int memberUpdate(Map<String, Object> pMap) {
		log.info("memberUpdate 확인");
		int result = 0;
		String memberPassword = (String) pMap.get("memberPassword");
		String memberPasswordEncoded = passwordEncoder.encode(memberPassword);
		pMap.put("memberPassword", memberPasswordEncoded); // key값 수정
		result = signUpDao.memberUpdate(pMap);
		return result;
	}
	
	// 비밀번호 Update
	@Override
	public int changePwUpdate(Map<String, Object> pMap) {
		log.info("changePwUpdate 확인");
		int result = 0;
		String memberPassword = (String) pMap.get("changePwUpdate");
		String memberPasswordEncoded = passwordEncoder.encode(memberPassword);
		pMap.put("memberPassword", memberPasswordEncoded); // key값 수정
		result = signUpDao.changePwUpdate(pMap);
		return result;
	}

	// Delete
	@Override
	public int memberDelete(Map<String, Object> pMap) {
	    log.info("memberDelete 확인");
		log.info(pMap.toString());
	    int result = 0;
	    String memberId = (String) pMap.get("memberId");
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("memberId", memberId);
	    result = signUpDao.memberDelete(paramMap);
	    return result;
	}
}
