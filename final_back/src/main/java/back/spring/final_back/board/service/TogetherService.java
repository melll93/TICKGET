package back.spring.final_back.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import back.spring.final_back.board.repository.TogetherDto;

public interface TogetherService {
    // Together 게시판 조회(SelectAll)
    List<TogetherDto> selectBoardList();

    // Together 게시글 상세보기(SelectOne)
    TogetherDto selectBoardDetail(TogetherDto togetherDto);

    // Together 게시판 등록(Insert)
    int insertBoardList(TogetherDto togetherDto);

    // Together 게시판 수정(Update)
    int updateBoardList(TogetherDto togetherDto);

    // Together 게시판 삭제(Delete)
    int deleteBoardList(TogetherDto togetherDto);

    // Together 게시판 조회수 확인하자
    public void viewUp( Map<String, Object> pMap);

}