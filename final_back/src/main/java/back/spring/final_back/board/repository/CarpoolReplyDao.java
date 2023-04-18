package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CarpoolReplyDao {
    // CapoolBoard 댓글 조회(SelectAll)
    List<CarpoolReplyDto> selectCarpoolReplyList(CarpoolReplyDto carpoolReplyDto);

    // CapoolBoard 댓글 등록(Insert)
    int insertCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // CapoolBoard 댓글 수정(Update)
    int updateCarpoolReply(CarpoolReplyDto carpoolReplyDto);

    // CapoolBoard 댓글 삭제(Delete)
    int deleteCarpoolReply(CarpoolReplyDto carpoolReplyDto);
}
