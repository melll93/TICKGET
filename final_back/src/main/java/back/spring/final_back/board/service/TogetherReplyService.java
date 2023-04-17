package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.TogetherReplyDto;

public interface TogetherReplyService {
    // Together 게시판 댓글 조회(SelectAll)
    List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto);

    // Together 게시판 댓글 등록(Insert)
    int insertTogetherReply(TogetherReplyDto togetherReplyDto);

    // Together 게시판 댓글 수정(Update)
    int updateTogetherReply(TogetherReplyDto togetherReplyDto);

    // Together 게시판 댓글 삭제(Delete)
    int deleteTogetherReply(TogetherReplyDto togetherReplyDto);

}