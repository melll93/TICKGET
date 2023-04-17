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

import back.spring.final_back.board.repository.CarpoolReplyDto;
import back.spring.final_back.board.service.CarpoolReplyService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/carpool")
@RequiredArgsConstructor
public class CarpoolRepleController {
	Logger logger = LoggerFactory.getLogger(CarpoolRepleController.class);
	private final CarpoolReplyService carpoolReplyService;

	// CapoolBoard 조회(SelectAll)
	@GetMapping("/selectCarpoolReplyList")
	public List<CarpoolReplyDto> selectCarpoolReplyList(CarpoolReplyDto carpoolReplyDto) {
		logger.info("CarpoolRepleController : selectCarpoolReplyList 호출");
		List<CarpoolReplyDto> mList = null;
		mList = carpoolReplyService.selectCarpoolReplyList(carpoolReplyDto);
		return mList;
	}

	// CapoolBoard 등록(Insert)
	@GetMapping("/insertCarpoolReply")
	public int insertCarpoolReplyList(CarpoolReplyDto carpoolReplyDto) {
		logger.info("CarpoolRepleController : insertCarpoolReplyList 호출");
		int result = carpoolReplyService.insertCarpoolReply(carpoolReplyDto);
		return result;
	}

	// CapoolBoard 수정(Update)
	@PostMapping("/updateCarpoolReply")
	public int updateCarpoolReplySubmit(@RequestBody CarpoolReplyDto carpoolReplyDto) {
		logger.info("CarpoolRepleController : updateCarpoolReplySubmit 호출");
		int result = 0;
		logger.error("boardDto = {}", carpoolReplyDto);
		result = carpoolReplyService.updateCarpoolReply(carpoolReplyDto);
		return result;
	}

	// CapoolBoard 삭제(Delete)
	@PostMapping("/deleteCarpoolReply")
	public int deleteCarpoolReply(@RequestBody CarpoolReplyDto carpoolReplyDto) {
		logger.info("CarpoolRepleController : deleteCarpoolReply 호출");
		logger.error("delete boardDto = {}", carpoolReplyDto);
		int result = 0;
		result = carpoolReplyService.deleteCarpoolReply(carpoolReplyDto);
		return result;
	}
}
