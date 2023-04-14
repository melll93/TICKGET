package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.CarpoolReplyDao;
import back.spring.final_back.board.repository.CarpoolReplyDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarpoolReplyServiceImpl implements CarpoolReplyService {
    Logger logger = LoggerFactory.getLogger(TogetherReplyServiceImpl.class);
    private final CarpoolReplyDao carpoolReplyDao;

    // 댓글 조회(SelectAll)
    @Override
    public List<CarpoolReplyDto> selectCarpoolReplyList(CarpoolReplyDto carpoolReplyDto) {
        logger.info("CarpoolReplyServiceImpl : selectCarpoolReplyList");
        List<CarpoolReplyDto> mList = null;
        mList = carpoolReplyDao.selectCarpoolReplyList(carpoolReplyDto);
        return mList;
    }

    // 댓글 등록(Insert)
    @Override
    public int insertCarpoolReply(CarpoolReplyDto carpoolReplyDto) {
        logger.info("CarpoolReplyServiceImpl : insertCarpoolReply");
        int result = carpoolReplyDao.insertCarpoolReply(carpoolReplyDto);
        return result;
    }

    // 댓글 수정(Update)
    @Override
    public int updateCarpoolReply(CarpoolReplyDto carpoolReplyDto) {
        logger.info("CarpoolReplyServiceImpl : updateCarpoolReply");
        int result = carpoolReplyDao.updateCarpoolReply(carpoolReplyDto);
        return result;
    }

    // 댓글 삭제(Delete)
    @Override
    public int deleteCarpoolReply(CarpoolReplyDto carpoolReplyDto) {
        logger.info("CarpoolReplyServiceImpl : deleteCarpoolReply");
        int result = carpoolReplyDao.deleteCarpoolReply(carpoolReplyDto);
        return result;
    }
}
