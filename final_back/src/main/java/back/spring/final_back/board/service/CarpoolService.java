package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.repository.TogetherDto;

public interface CarpoolService {
    // 카풀 게시판 조회
    public List<TogetherDto> selectCarpool();

    // 카풀 게시글 상세보기
    public TogetherDto CarpoolDetail(CarpoolDto carpoolDto);

    // 카풀 게시글 작성
    public int insertCarpool(CarpoolDto carpoolDto);

    // 카풀 게시글 삭제
    public int deleteCarpool(CarpoolDto carpoolDto);

}
