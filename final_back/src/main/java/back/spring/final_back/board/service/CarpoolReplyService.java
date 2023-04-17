package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import back.spring.final_back.board.repository.CarpoolReplyDto;

public interface CarpoolReplyService {
    // Carpool 게시판 조회(SelectAll)
    List<CarpoolReplyDto> selectCarpoolReplyList(CarpoolReplyDto carpoolReplyDto);

    // Carpool 게시판 등록(Insert)
    int insertCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // Carpool 게시판 수정(Update)
    int updateCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // Carpool 게시판 삭제(Delete)
    int deleteCarpoolReply(CarpoolReplyDto carpoolReplyDto);

}
