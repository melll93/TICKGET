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

import back.spring.final_back.board.repository.TogetherReplyDto;
import back.spring.final_back.board.service.TogetherReplyService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/board")
@RequiredArgsConstructor
public class TogetherRepleController {
	Logger logger = LoggerFactory.getLogger(TogetherRepleController.class);
	private final TogetherReplyService togetherReplyService;

	// 게시판 댓글 조회(SelectAll)
	@GetMapping("/selectTogetherReplyList")
	public List<TogetherReplyDto> selectTogetherReplyList(TogetherReplyDto togetherReplyDto) {
		logger.info("TogetherRepleController : selectTogetherReplyList 호출");
		List<TogetherReplyDto> mList = null;
		mList = togetherReplyService.selectTogetherReplyList(togetherReplyDto);
		return mList;
	}

	// 게시판 댓글 등록(Insert)
	@GetMapping("/insertTogetherReply")
	public int insertTogetherReplyList(TogetherReplyDto togetherReplyDto) {
		logger.info("TogetherRepleController : insertTogetherReply");
		int result = togetherReplyService.insertTogetherReply(togetherReplyDto);
		return result;
	}

	// 게시판 댓글 수정(Update)
	@PostMapping("/updateTogetherReply")
	public int updateTogetherReplySubmit(@RequestBody TogetherReplyDto togetherReplyDto) {
		logger.info("TogetherRepleController : updateTogetherReplySubmit");
		int result = 0;
		logger.error("update boardDto = {}", togetherReplyDto);
		result = togetherReplyService.updateTogetherReply(togetherReplyDto);
		return result;
	}

	// 게시판 댓글 삭제(Delete)
	@PostMapping("/deleteTogetherReply")
	public int deleteTogetherReply(@RequestBody TogetherReplyDto togetherReplyDto) {
		logger.info("TogetherRepleController : deleteTogetherReply 호출");
		int result = 0;
		result = togetherReplyService.deleteTogetherReply(togetherReplyDto);
		return result;
	}

}
