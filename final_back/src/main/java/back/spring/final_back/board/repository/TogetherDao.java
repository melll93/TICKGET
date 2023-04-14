package back.spring.final_back.board.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface TogetherDao {
    // 게시판 조회(SelectAll)
    public List<TogetherDto> selectBoardList();

    // 게시글 상세보기(SelectOne)
    public TogetherDto selectBoardDetail(TogetherDto togetherDto);

    // 게시판 등록(Insert)
    public int insertBoardList(TogetherDto togetherDto);

    // 게시판 수정(Update)
    public int updateBoardList(TogetherDto togetherDto);

    // 게시판 삭제(Delete)
    public int deleteBoardList(TogetherDto togetherDto);

    // 조회수 증가
    void viewUp(@RequestParam Map<String, Object> pMap);
}
