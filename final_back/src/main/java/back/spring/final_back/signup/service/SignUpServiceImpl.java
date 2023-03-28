package back.spring.final_back.signup.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import back.spring.final_back.signup.repository.SignUpDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignUpServiceImpl implements SignUpService {
  private final SignUpDao signUpDao;
  // Insert
  @Override
	public int memberInsert(Map<String, Object> pMap) {
		int result = 0;
		result = signUpDao.memberInsert(pMap);
		return result;
	}
  // Update
  @Override
  public int memberUpdate(Map<String, Object> pMap) {
		int result = 0;
		result = signUpDao.memberUpdate(pMap);
		return result;
  }
  // Delete
  @Override
  public int memberDelete(Map<String, Object> pMap) {
		int result = 0;
		result = signUpDao.memberDelete(pMap);
		return result;
  }
  
}
