package back.spring.final_back.member.service;

import java.util.List;
import java.util.Map;

public interface SignUpService {
	// 자바 메일을 사용하여 이메일 전송
	/*
	 * @Autowired private JavaMailSender javaMailSender;
	 */

	List<Map<String, Object>> memberList(Map<String, Object> pMap);

	int memberInsert(Map<String, Object> pMap);

	int memberUpdate(Map<String, Object> pMap);

	int memberDelete(Map<String, Object> pMap);
}
