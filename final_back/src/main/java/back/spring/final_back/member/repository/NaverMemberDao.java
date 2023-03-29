package back.spring.final_back.member.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NaverMemberDao {

  NaverMemberDto searchMemberbyId(String id);

}
