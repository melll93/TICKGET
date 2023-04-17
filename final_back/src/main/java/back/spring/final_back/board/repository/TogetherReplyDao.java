package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TogetherReplyDao {
    // Together 게시판 조회(SelectAll)
    public List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto);

    // Together 게시글 상세보기(SelectOne)
    public TogetherReplyDto selectTogetherReplyDetail(TogetherReplyDto togetherReplyDto);

    // Together 게시판 등록(Insert)
    public int insertTogetherReply(TogetherReplyDto togetherReplyDto);

    // Together 게시판 수정(Update)
    public int updateTogetherReply(TogetherReplyDto togetherReplyDto);

    // Together 게시판 삭제(Delete)
    public int deleteTogetherReply(TogetherReplyDto togetherReplyDto);
}
