package back.spring.final_back.member.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public interface SignUpDao {
	// 전체 조회
	public List<Map<String, Object>> memberList(Map<String, Object> pMap);

	// Insert
	public int memberInsert(Map<String, Object> pMap);

	// Update
	public int memberUpdate(Map<String, Object> pMap);

	// Delete
	public int memberDelete(Map<String, Object> pMap);
}

// public class SignUpDao {
// @Autowired
// private SqlSessionTemplate sqlSessionTemplate = null;

// // Insert
// public int memberInsert(Map<String, Object> pMap) {
// int result = 0;
// result = sqlSessionTemplate.update("memberInsert", pMap); //insert는 리턴 타입이
// Object이기 때문에 update로 사용
// return result;
// }

// // Update
// public int memberUpdate(Map<String, Object> pMap) {
// int result = 0;
// result = sqlSessionTemplate.update("memberUpdate", pMap);
// return result;
// }

// // Delete
// public int memberDelete(Map<String, Object> pMap) {
// int result = 0;
// result = sqlSessionTemplate.delete("memberDelete", pMap);
// return result;
// }
// }
