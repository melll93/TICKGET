package back.spring.final_back.member.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MemberDao {
    public MemberDto searchById();

    public MemberDto localMemberLogin(MemberDto memberDto);
}
