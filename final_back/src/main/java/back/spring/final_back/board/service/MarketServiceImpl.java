package back.spring.final_back.board.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import back.spring.final_back.board.repository.MarketDao;
import back.spring.final_back.board.repository.MarketDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
	Logger logger = LoggerFactory.getLogger(MarketService.class);

	private final MarketDao marketDao;

	// 마켓 게시판 조회
	@Override
	public List<MarketDto> mk_boardList(MarketDto marketDto) {
		List<MarketDto> mList = marketDao.mk_boardList(marketDto);
		return mList;
	}
	
	
	
	//마켓 게시판 게시글 상세보기
	@Override
	public List<MarketDto> mk_boardDetail(MarketDto marketDto) {
		logger.info("MarketServiceImpl : mk_boardDetail 호출");
		List<MarketDto> mList = marketDao.mk_boardDetail(marketDto);
		if(mList.size()>0) {
			marketDao.mk_boardHit(marketDto);
		}
		return mList;
	}

	
	
	
	// 마켓 게시판 게시글 등록
	@Override
	public int mk_boardInsert(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardInsert(marketDto);
		return result;
	}

	// 마켓 게시판 게시글 수정
	@Override
	public int mk_boardUpdate(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardUpdate(marketDto);
		return result;
	}

	//마켓 게시판 게시글 삭제
	@Override
	public int mk_boardDelete(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardDelete(marketDto);
		return result;
	}




}
