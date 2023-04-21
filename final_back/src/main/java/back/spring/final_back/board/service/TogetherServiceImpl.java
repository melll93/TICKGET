package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import back.spring.final_back.board.repository.TogetherDao;
import back.spring.final_back.board.repository.TogetherDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TogetherServiceImpl implements TogetherService {
    Logger logger = LoggerFactory.getLogger(TogetherServiceImpl.class);
    private final TogetherDao togetherDao;

    // Together 게시판 조회(SelectAll)
    @Override
    public List<TogetherDto> selectBoardList() {
        logger.info("TogetherServiceImpl : selectBoardList");
        List<TogetherDto> mList = null;
        mList = togetherDao.selectBoardList();
        return mList;
    }

    // Together 게시글 상세보기(SelectOne)
    @Override
    public TogetherDto selectBoardDetail(TogetherDto togetherDto) {
        logger.info("TogetherServiceImpl : selectBoardDetail");
        TogetherDto mList = togetherDao.selectBoardDetail(togetherDto);
        return mList;
    }

    // Together 게시판 등록(Insert)
    @Override
    public int insertBoardList(TogetherDto togetherDto) {
        logger.info("TogetherServiceImpl : insertBoardList");
        int result = togetherDao.insertBoardList(togetherDto);
        return result;
    }

    // Together 게시판 수정(Update)
    @Override
    public int updateBoardList(TogetherDto togetherDto) {
        logger.info("TogetherServiceImpl : updateBoardList");
        int result = togetherDao.updateBoardList(togetherDto);
        return result;
    }

    // Together 게시판 삭제(Delete)
    @Override
    public int deleteBoardList(TogetherDto togetherDto) {
        logger.info("TogetherServiceImpl : deleteBoardList");
        int result = togetherDao.deleteBoardList(togetherDto);
        return result;
    }

    // Together 게시판 조회수 증가
    @Override
    public void viewUp(@RequestParam Map<String, Object> pMap) {
        logger.info("TogetherServiceImpl : viewUp");
        logger.error("TogetherServiceImpl의 pMap = {}", pMap);
        togetherDao.viewUp(pMap);
    }

}
