package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.BoardDao;
import back.spring.final_back.board.repository.BoardDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);
    private final BoardDao boardDao;

    // 게시판 조회(SelectAll)
    @Override
    public List<BoardDto> selectBoardList() {
        logger.info("BoardServiceImpl : selectBoardList");
        List<BoardDto> mList = null;
        mList = boardDao.selectBoardList();
        return mList;
    }

    // 게시글 상세보기(SelectOne)
    @Override
    public BoardDto selectBoardDetail(BoardDto boardDto) {
        BoardDto mList = boardDao.selectBoardDetail(boardDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertBoardList(BoardDto boardDto) {
        int result = boardDao.insertBoardList(boardDto);
        return result;
    }

    // 게시판 수정(Update)
    @Override
    public int updateBoardList(BoardDto boardDto) {
        int result = boardDao.updateBoardList(boardDto);
        return result;
    }

    // 게시판 삭제(Delete)
    @Override
    public int deleteBoardList(BoardDto boardDto) {
        int result = boardDao.deleteBoardList(boardDto);
        return result;
    }

    public int qnaInsert(Map<String, Object> pMap) {
        logger.info("qnaInsert호출");
        int result = 0;
        result = boardDao.qnaInsert(pMap);
        return result;
     }
     public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
        logger.info("qnaList 호출");
        List<Map<String,Object>> bList = null;
        bList = boardDao.qnaList(pMap);
        return bList;
     }
}
