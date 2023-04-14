package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import back.spring.final_back.board.repository.CarpoolReplyDto;

public interface CarpoolReplyService {
    // 조회
    List<CarpoolReplyDto> selectCarpoolReplyList(CarpoolReplyDto carpoolReplyDto);

    // 입력
    int insertCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // 수정
    int updateCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // 삭제
    int deleteCarpoolReply(CarpoolReplyDto carpoolReplyDto);

}
