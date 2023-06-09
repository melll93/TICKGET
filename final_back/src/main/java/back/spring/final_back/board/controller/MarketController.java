package back.spring.final_back.board.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import back.spring.final_back.board.repository.MarketDto;
import back.spring.final_back.board.service.MarketService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/market/*")
@RequiredArgsConstructor
public class MarketController {
	Logger logger = LoggerFactory.getLogger(MarketController.class);
	private final MarketService marketService;

	// 마켓 게시판 게시글 조회
	@GetMapping("/mk_boardList")
	public List<MarketDto> mk_boardList(MarketDto marketDto) {
		logger.info("MarketController : mk_boardList 호출");
		List<MarketDto> dList = null;
		dList = marketService.mk_boardList(marketDto);
		return dList;
	}

	// 마켓 게시판 게시글 상세보기
	@GetMapping("/mk_boardDetail")
	public List<MarketDto> mk_boardDetail (MarketDto marketDto) {
		logger.info("MarketController : mk_boardDetail 호출");
		List<MarketDto> qList = null;
		qList = marketService.mk_boardDetail(marketDto);
		return qList;
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

	// 마켓 게시판 게시글 삭제
	@GetMapping("/mk_boardDelete")
	public int mk_boardDelete(MarketDto marketDto) {
		logger.info("MarketController : mk_boardDelete 호출");
		int result = 0;
		result = marketService.mk_boardDelete(marketDto);
		return result;
	}
	
	//마켓 게시판 판매처리
	@GetMapping("/mk_boardSell")
	public int mk_boardSell(MarketDto marketDto) {
		logger.info("MarketController : mk_boardSell 호출");
		int result = 0;
		result = marketService.mk_boardSell(marketDto);
		return result;
	}
		
	
	//게시글 찜 갯수 증가
	@GetMapping("/mk_plusLikes")
	public int mk_plusLikes(MarketDto marketDto) {
		logger.info("MarketController : mk_plusLikes 호출");
		int result = 0;
		result = marketService.mk_plusLikes(marketDto);
		return result;
	}
	
	
	//게시글 찜 갯수 감소
	@GetMapping("/mk_minusLikes")
	public int mk_minusLikes(MarketDto marketDto) {
		logger.info("MarketController : mk_miusLikes 호출");
		int result = 0;
		result = marketService.mk_minusLikes(marketDto);
		return result;
	}
	

	}
