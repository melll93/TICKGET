package back.spring.final_back.board.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.CarpoolDao;
import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.repository.TogetherDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarpoolServiceImpl implements CarpoolService {
    Logger logger = LoggerFactory.getLogger(TogetherServiceImpl.class);
    private final CarpoolDao carpoolDao;

    // 게시판 조회(SelectAll)
    @Override
    public List<TogetherDto> selectCarpool() {
        logger.info("CarpoolServiceImpl : selectCarpoolList");
        List<TogetherDto> mList = null;
        mList = carpoolDao.selectCarpool();
        return mList;
    }

    // 게시글 상세보기(SelectOne)
    @Override
    public TogetherDto CarpoolDetail(CarpoolDto carpoolDto) {
        TogetherDto mList = carpoolDao.carpoolDetail(carpoolDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertCarpool(CarpoolDto carpoolDto) {
        int result = carpoolDao.insertCarpool(carpoolDto);
        return result;
    }

    // 게시판 글 삭제
    @Override
    public int deleteCarpool(CarpoolDto carpoolDto) {
        int result = carpoolDao.deleteCarpool(carpoolDto);
        return result;
    }

}
