package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import back.spring.final_back.board.repository.TogetherReplyDto;

public interface TogetherReplyService {
    // 게시판 조회(SelectAll)
    List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto);

    // 게시판 등록(Insert)
    int insertTogetherReply(TogetherReplyDto togetherReplyDto);

    // 게시판 수정(Update)
    int updateTogetherReply(TogetherReplyDto togetherReplyDto);

    // 게시판 삭제(Delete)
    int deleteTogetherReply(TogetherReplyDto togetherReplyDto);

    //조회수 확인하자
    void viewTogetherReplyUp(@RequestParam Map<String, Object> pMap);

}