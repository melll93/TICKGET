package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

    public List<BoardDto> selectBoardList();

    public int insertBoardList(BoardDto boardDto);

}
