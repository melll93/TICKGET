package back.spring.final_back.boardsample.service;

import back.spring.final_back.boardsample.repository.BoardDao;
import back.spring.final_back.boardsample.repository.BoardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardDao boardDao;

    @Override
    public List<BoardDto> boardSearch(String input) {
        List<BoardDto> board = boardDao.boardSearch(input);
        return board;
    }

    @Override
    public List<BoardDto> boardList() {
        List<BoardDto> board = boardDao.boardList();
        return board;
    }

    @Override
    public int boardInsert(BoardDto boardDto) {
        int result = boardDao.boardInsert(boardDto);
        return result;
    }
}