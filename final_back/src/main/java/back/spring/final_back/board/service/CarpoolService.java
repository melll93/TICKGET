package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import back.spring.final_back.board.repository.CarpoolDto;

public interface CarpoolService {
    // Carpool 게시판 조회
    public List<CarpoolDto> selectCarpool();

    // Carpool 게시글 상세보기
    public CarpoolDto CarpoolDetail(CarpoolDto carpoolDto);

    // Carpool 게시글 다음 번호 조회
    public int getBoardCpNo();

    // Carpool 게시글 작성
    public int insertCarpool(CarpoolDto carpoolDto);

    // Carpool 게시글 삭제
    public int deleteCarpool(CarpoolDto carpoolDto);

     // Carpool 수정(Update)
     int updateCarpool(CarpoolDto carpoolDto);

     //Carpool 게시판 조회수 증가
    public void viewUp(Map<String, Object> pMap);
}
