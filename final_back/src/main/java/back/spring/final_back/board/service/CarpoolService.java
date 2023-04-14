package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import back.spring.final_back.board.repository.CarpoolDto;

public interface CarpoolService {
    // 카풀 게시판 조회
    public List<CarpoolDto> selectCarpool();

    // 카풀 게시글 상세보기
    public CarpoolDto CarpoolDetail(CarpoolDto carpoolDto);

    // 카풀 게시글 작성
    public int insertCarpool(CarpoolDto carpoolDto);

    // 카풀 게시글 삭제
    public int deleteCarpool(CarpoolDto carpoolDto);

     // 게시판 수정(Update)
     int updateCarpool(CarpoolDto carpoolDto);

    public void viewUp(Map<String, Object> pMap);
}
