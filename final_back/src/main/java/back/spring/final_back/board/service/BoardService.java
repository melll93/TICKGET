package back.spring.final_back.board.service;


import back.spring.final_back.board.repository.BoardDto;

import java.util.List;

public interface BoardService {


    List<BoardDto> boardSearch(String input);
    List<BoardDto> boardList();

    int boardInsert(BoardDto boardDto);
}
