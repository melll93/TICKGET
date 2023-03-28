package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.BoardDto;

public interface BoardService {

    // 게시판 조회(SelectAll)
    List<BoardDto> selectBoardList();

    // 게시판 등록(Insert)
    int insertBoardList(BoardDto boardDto);

    // 게시판 수정(Update)
    int updateBoardList(BoardDto boardDto);

    // 게시판 삭제(Delete)
    int deleteBoardList(BoardDto boardDto);
}