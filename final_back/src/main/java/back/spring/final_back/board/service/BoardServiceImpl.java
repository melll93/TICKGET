package back.spring.final_back.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.BoardDao;
import back.spring.final_back.board.repository.BoardDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

private final BoardDao boardDao;

    @Override
    public List<BoardDto> selectBoardList() {
        List<BoardDto> mList = null;
        mList = boardDao.selectBoardList();
        return mList;
    }


    
}
