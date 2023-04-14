package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.TogetherReplyDto;
import back.spring.final_back.board.repository.TogetherReplyDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TogetherReplyServiceImpl implements TogetherReplyService {
    Logger logger = LoggerFactory.getLogger(TogetherReplyServiceImpl.class);
    private final TogetherReplyDao togetherReplyDao;

    // 게시판 조회(SelectAll)
    @Override
    public List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto) {
        logger.info("TogetherReplyServiceImpl : selectTogetherReplyList");
        List<TogetherReplyDto> mList = null;
        mList = togetherReplyDao.selectTogetherReplyList(togetherReplyDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertTogetherReply(TogetherReplyDto togetherReplyDto) {
        logger.info("TogetherReplyServiceImpl : insertTogetherReply");
        int result = togetherReplyDao.insertTogetherReply(togetherReplyDto);
        return result;
    }

    // 게시판 수정(Update)
    @Override
    public int updateTogetherReply(TogetherReplyDto togetherReplyDto) {
        logger.info("TogetherReplyServiceImpl : updateTogetherReply");
        int result = togetherReplyDao.insertTogetherReply(togetherReplyDto);
        return result;
    }

    // 게시판 삭제(Delete)
    @Override
    public int deleteTogetherReply(TogetherReplyDto togetherReplyDto) {
        logger.info("TogetherReplyServiceImpl : deleteTogetherReply");
        int result = togetherReplyDao.insertTogetherReply(togetherReplyDto);
        return result;
    }
}
