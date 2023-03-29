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

    // 게시판 조회(SelectAll)
    @Override
    public List<BoardDto> selectBoardList() {
        List<BoardDto> mList = null;
        mList = boardDao.selectBoardList();
        return mList;
    }

    // 게시판 등록(Insert)
    @Override
    public int insertBoardList(BoardDto boardDto) {
        int result = boardDao.insertBoardList(boardDto);
        return result;
    }

    // 게시판 수정(Update)
    @Override
    public int updateBoardList(BoardDto boardDto) {
        int result = boardDao.updateBoardList(boardDto);
        return result;
    }

    // 게시판 삭제(Delete)
    @Override
    public int deleteBoardList(BoardDto boardDto) {
        int result = boardDao.deleteBoardList(boardDto);
        return result;
    }
}
