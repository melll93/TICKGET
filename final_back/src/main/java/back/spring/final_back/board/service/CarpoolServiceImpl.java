package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import back.spring.final_back.board.repository.CarpoolDao;
import back.spring.final_back.board.repository.CarpoolDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarpoolServiceImpl implements CarpoolService {
    Logger logger = LoggerFactory.getLogger(TogetherServiceImpl.class);
    private final CarpoolDao carpoolDao;

    // 게시판 조회(SelectAll)
    @Override
    public List<CarpoolDto> selectCarpool() {
        logger.info("CarpoolServiceImpl : selectCarpoolList");
        List<CarpoolDto> mList = null;
        mList = carpoolDao.selectCarpool();
        return mList;
    }

    // 게시글 상세보기(SelectOne)
    @Override
    public CarpoolDto CarpoolDetail(CarpoolDto carpoolDto) {
        logger.info("CarpoolServiceImpl : CarpoolDetail");
        CarpoolDto mList = carpoolDao.carpoolDetail(carpoolDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertCarpool(CarpoolDto carpoolDto) {
        logger.info("CarpoolServiceImpl : insertCarpool");
        int result = carpoolDao.insertCarpool(carpoolDto);
        return result;
    }

    // 게시판 글 삭제
    @Override
    public int deleteCarpool(CarpoolDto carpoolDto) {
        logger.info("CarpoolServiceImpl : deleteCarpool");
        int result = carpoolDao.deleteCarpool(carpoolDto);
        return result;
    }

    // 게시판 수정(Update)
    @Override
    public int updateCarpool(CarpoolDto carpoolDto) {
        int result = carpoolDao.updateCarpool(carpoolDto);
        return result;
    }

    //조회수 증가
    @Override
    public void viewUp(@RequestParam Map<String, Object> pMap) {
        logger.info("TogetherServiceImpl : viewUp");
        carpoolDao.viewUp(pMap);
    }

}
