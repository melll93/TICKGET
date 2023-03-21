package back.spring.final_back.board.controller;

import back.spring.final_back.board.repository.BoardDto;
import back.spring.final_back.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@Controller
@ResponseBody
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    Logger logger = LoggerFactory.getLogger(BoardController.class);
    private Map<String, BoardDto> boardMap;

    private final BoardService boardService;

    @GetMapping("/boardSearch")
    public List<BoardDto> boardSearch(@RequestParam(required = false) String input) {
        List<BoardDto> board = boardService.boardSearch(input);
        logger.info(board.toString());
        return board;
    }

    @GetMapping("/boardList")
    public List<BoardDto> boardList() {
        List<BoardDto> board = boardService.boardList();
        return board;
    }

    @PostMapping ("/boardInsert")
    public int boardInsert(@RequestBody BoardDto boardDto) {
        int result = boardService.boardInsert(boardDto);
        logger.info(boardDto.toString());
        return result;
    }

}
