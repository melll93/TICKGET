package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.MarketDto;


public interface MarketService {

	//마켓 게시판 조회
	List<MarketDto> mk_boardList();


    //마켓 게시글 등록
	int mk_boardInsert(MarketDto donationDto);


	//마켓 게시글 수정
	int mk_boardUpdate(MarketDto donationDto);

	
	//마켓 게시글 삭제
	int mk_boardDelete(MarketDto donationDto);
}
