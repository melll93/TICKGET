package back.spring.final_back.member.service;

import java.util.List;
import java.util.Map;

import back.spring.final_back.member.controller.SingUpController;
import back.spring.final_back.member.repository.SignUpDao;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignUpServiceImpl implements SignUpService {
	private final SignUpDao signUpDao;

	// 전체 조회
	@Override
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		log.info("memberList 확인");
		List<Map<String, Object>> mList = null;
		mList = signUpDao.memberList(pMap);
		return mList;
	}
	
	// Insert
	@Override
	public int memberInsert(Map<String, Object> pMap) {
		log.info("memberInsert 확인");
		int result = 0;
		result = signUpDao.memberInsert(pMap);
		return result;
	}

	// Update
	@Override
	public int memberUpdate(Map<String, Object> pMap) {
		log.info("memberUpdate 확인");
		int result = 0;
		result = signUpDao.memberUpdate(pMap);
		return result;
	}

	// Delete
	@Override
	public int memberDelete(Map<String, Object> pMap) {
		log.info("memberDelete 확인");
		int result = 0;
		result = signUpDao.memberDelete(pMap);
		return result;
	}
}
