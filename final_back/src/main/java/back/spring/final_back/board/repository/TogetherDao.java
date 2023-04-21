package back.spring.final_back.board.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface TogetherDao {
    // Together 게시판 조회(SelectAll)
    public List<TogetherDto> selectBoardList();

    // Together게시글 상세보기(SelectOne)
    public TogetherDto selectBoardDetail(TogetherDto togetherDto);

    // Together게시판 등록(Insert)
    public int insertBoardList(TogetherDto togetherDto);

    // Together게시판 수정(Update)
    public int updateBoardList(TogetherDto togetherDto);

    // Together게시판 삭제(Delete)
    public int deleteBoardList(TogetherDto togetherDto);

    // Together 게시판 조회수 증가
    public void viewUp(Map<String, Object> pMap);
}
