package back.spring.final_back.board.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDao {
    List<BoardDto> boardList();
    List<BoardDto> boardSearch(String input);
    int boardInsert(BoardDto board);
    int boardUpdate(BoardDto board);
    int boardDelete(BoardDto board);


}
