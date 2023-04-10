package back.spring.final_back.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import back.spring.final_back.board.repository.MarketDto;


public interface MarketService {

	//마켓 게시판 조회
	List<MarketDto> mk_boardList(MarketDto marketDto);

	//마켓 게시판 상세보기
	List<MarketDto> mk_boardDetail(MarketDto marketDto);


	
	//마켓 게시글 등록
	int mk_boardInsert(MarketDto marketDto);


	//마켓 게시글 수정
	int mk_boardUpdate(MarketDto marketDto);

	
	//마켓 게시글 삭제
	int mk_boardDelete(MarketDto marketDto);



    
}
