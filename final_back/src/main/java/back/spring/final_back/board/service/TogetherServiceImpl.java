package back.spring.final_back.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.TogetherDao;
import back.spring.final_back.board.repository.TogetherDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TogetherServiceImpl implements TogetherService {
    Logger logger = LoggerFactory.getLogger(TogetherServiceImpl.class);
    private final TogetherDao togetherDao;

    // 게시판 조회(SelectAll)
    @Override
    public List<TogetherDto> selectBoardList() {
        logger.info("BoardServiceImpl : selectBoardList");
        List<TogetherDto> mList = null;
        mList = togetherDao.selectBoardList();
        return mList;
    }

    // 게시글 상세보기(SelectOne)
    @Override
    public TogetherDto selectBoardDetail(TogetherDto togetherDto) {
        TogetherDto mList = togetherDao.selectBoardDetail(togetherDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertBoardList(TogetherDto togetherDto) {
        int result = togetherDao.insertBoardList(togetherDto);
        return result;
    }

    // 게시판 수정(Update)
    @Override
    public int updateBoardList(TogetherDto togetherDto) {
        int result = togetherDao.updateBoardList(togetherDto);
        return result;
    }

    // 게시판 삭제(Delete)
    @Override
    public int deleteBoardList(TogetherDto togetherDto) {
        int result = togetherDao.deleteBoardList(togetherDto);
        return result;
    }

    //조회수 증가
    @Override
    public void viewUp(int board_tg_no, String board_tg_mem_id) {
        Map<String, Object> param = new HashMap<>();
        param.put("boardNo", board_tg_no);
  
        if(board_tg_mem_id != null) {
          param.put("memberId", board_tg_mem_id);
        }
    }


    public int qnaInsert(Map<String, Object> pMap) {
        logger.info("qnaInsert호출");
        int result = 0;
        result = togetherDao.qnaInsert(pMap);
        return result;
     }
     public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
        logger.info("qnaList 호출");
        List<Map<String,Object>> bList = null;
        bList = togetherDao.qnaList(pMap);
        return bList;
     }


}
