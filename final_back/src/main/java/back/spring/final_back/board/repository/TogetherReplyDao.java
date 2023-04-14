package back.spring.final_back.board.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TogetherReplyDao {
    // 게시판 조회(SelectAll)
    public List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto);

    // 게시글 상세보기(SelectOne)
    public TogetherReplyDto selectTogetherReplyDetail(TogetherReplyDto togetherReplyDto);

    // 게시판 등록(Insert)
    public int insertTogetherReply(TogetherReplyDto togetherReplyDto);

    // 게시판 수정(Update)
    public int updateTogetherReply(TogetherReplyDto togetherReplyDto);

    // 게시판 삭제(Delete)
    public int deleteTogetherReply(TogetherReplyDto togetherReplyDto);

    // 조회수 증가
    public void viewTogetherReplyUp(Map<String, Object> pMap);

}
