package back.spring.final_back.member.service;

import java.util.List;
import java.util.Map;

public interface SignUpService {


	List<Map<String, Object>> memberList(Map<String, Object> pMap);

	int memberInsert(Map<String, Object> pMap);

	int memberUpdate(Map<String, Object> pMap);

	int memberDelete(Map<String, Object> pMap);
}
