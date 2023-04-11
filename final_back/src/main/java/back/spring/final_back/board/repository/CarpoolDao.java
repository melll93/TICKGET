package back.spring.final_back.board.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CarpoolDao {
    // 카풀 게시판 전체 조회
    public List<CarpoolDto> selectCarpool();

    // 카풀 게시판 상세조회
    public CarpoolDto carpoolDetail(CarpoolDto carpoolDto);

    // 카풀 게시글 등록
    public int insertCarpool(CarpoolDto carpoolDto);

    // 카풀 게시글 삭제
    public int deleteCarpool(CarpoolDto carpoolDto);

    //카풀 게시글 업데이트
    public int updateCarpool(CarpoolDto carpoolDto);

}
