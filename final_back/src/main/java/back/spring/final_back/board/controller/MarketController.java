package back.spring.final_back.board.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.BoardDto;
import back.spring.final_back.board.repository.MarketDto;
import back.spring.final_back.board.service.BoardService;
import back.spring.final_back.board.service.MarketService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/market/*")
@RequiredArgsConstructor
public class MarketController {
	Logger logger = LoggerFactory.getLogger(BoardController.class);
	private final MarketService marketService;

	// 마켓 게시판 게시글 조회
	@GetMapping("/mk_boardList")
	public List<MarketDto> mk_boardList() {
		logger.info("MarketController : mk_boardList 호출");
		List<MarketDto> dList = null;
		dList = marketService.mk_boardList();
		return dList;
	}

	// 마켓 게시판 게시글 등록
	@PostMapping("/mk_boardInsert")
	public int mk_boardInsert(@RequestBody MarketDto marketDto) {
		logger.info("MarketController : mk_boardInsert 호출");
		int result = 0;
		result = marketService.mk_boardInsert(marketDto);
		return result;
	}

	// 마켓 게시판 게시글 수정
	@PostMapping("/mk_boardUpdate")
	public int mk_boardUpdate(@RequestBody MarketDto marketDto) {
		logger.info("MarketController : mk_boardUpdate 호출");
		int result = 0;
		result = marketService.mk_boardUpdate(marketDto);
		return result;
	}

	// 도네이션 게시판 게시글 삭제
	@GetMapping("/mk_boardDelete")
	public int mk_boardDelete(MarketDto marketDto) {
		logger.info("MarketController : mk_boardDelete 호출");
		int result = 0;
		result = marketService.mk_boardDelete(marketDto);
		return result;

	}
}
