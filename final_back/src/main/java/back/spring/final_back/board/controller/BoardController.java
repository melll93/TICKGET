package back.spring.final_back.board.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.BoardDto;
import back.spring.final_back.board.service.BoardService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardController {
    Logger logger = LoggerFactory.getLogger(BoardController.class);
    private final BoardService boardService;
    
    // 게시판 조회(SelectAll)
    @GetMapping("/selectBoardList")
    public List<BoardDto> selectBoardList() {
        logger.info("BoardController : selectBoardList 호출");
        List<BoardDto> mList = null;
        mList = boardService.selectBoardList();
        return mList;
    }
}
