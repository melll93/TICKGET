package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.BoardDto;

public interface BoardService {

    List<BoardDto> selectBoardList();
}
