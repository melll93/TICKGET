package back.spring.final_back.board.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.TogetherDto;
import back.spring.final_back.board.service.TogetherService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/board")
@RequiredArgsConstructor
public class TogetherController {
	Logger logger = LoggerFactory.getLogger(TogetherController.class);
	private final TogetherService togetherService;

	// Together 게시판 조회(SelectAll)
	@GetMapping("/selectBoardList")
	public List<TogetherDto> selectBoardList() {
		logger.info("TogetherController : selectBoardList 호출");
		List<TogetherDto> mList = null;
		mList = togetherService.selectBoardList();
		return mList;
	}

	// Together 게시글 상세보기(SelectOne)
	@GetMapping("/selectBoardDetail")
	public TogetherDto selectBoardDetail(TogetherDto togetherDto) {
		logger.info("TogetherController : selectBoardDetail 호출");
		TogetherDto mList = togetherService.selectBoardDetail(togetherDto);
		return mList;
	}

	// Together 게시판 등록(Insert)
	@GetMapping("/insertBoardList")
	public int insertBoardList(TogetherDto togetherDto) {
		logger.info("TogetherController : inserBoard호출");
		int result = togetherService.insertBoardList(togetherDto);
		return result;
	}

	// Together 게시글 수정(Update)
	@GetMapping("/updateBoardList")
	public TogetherDto updateBoardList(TogetherDto togetherDto) {
		logger.info("TogetherController : memberUpdate select");
		TogetherDto mList = togetherService.selectBoardDetail(togetherDto);
		return mList;
	}

	// Together 게시판 수정(Update)
	@PostMapping("/updateBoardList")
	public int updateBoardListSubmit(@RequestBody TogetherDto togetherDto) {
		logger.info("TogetherController : updateBoardList Submit");
		int result = 0;
		logger.error("boardDto = {}", togetherDto);
		result = togetherService.updateBoardList(togetherDto);
		return result;
	}

	// Together 게시판 삭제(Delete)
	@GetMapping("/deleteBoardList")
	public int deleteBoardList(TogetherDto togetherDto) {
		logger.info("TogetherController : memberDelete 호출");
		int result = 0;
		result = togetherService.deleteBoardList(togetherDto);
		return result;
	}

	// Together 조회수 증가시켜줘
	@GetMapping("/togetherViewUp")
	public void viewUp(@RequestParam Map<String, Object> pMap) {
		logger.info("BoardController : viewUp 호출");
		logger.error("pMap = {}", pMap);
		togetherService.viewUp(pMap);
	}

	/* ====================================== */
}
