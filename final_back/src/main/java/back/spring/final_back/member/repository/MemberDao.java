package back.spring.final_back.member.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper
public interface MemberDao {
    MemberDto login(String memberId);

    MemberDto localMemberLogin(MemberDto memberDto);

    MemberDto getMemberData(String memberId);

    Map<String, Object> checkFollow(String myId, String friendId);

    int addFollow(String myId, String friendId);

    int socialjoin(MemberDto memberDto);
}
