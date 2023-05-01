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

	
	//마켓 게시글 판매완료 처리
	int mk_boardSell(MarketDto marketDto);

	//게시글 찜 갯수 증가처리
	int mk_plusLikes(MarketDto marketDto);

	//게시글 찜 갯수 감소처리
	int mk_minusLikes(MarketDto marketDto);




    
}
