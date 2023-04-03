package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.DonationDto;


public interface DonationService {

	//도네이션 게시판 조회
	List<DonationDto> don_boardList();


    //도네이션 게시글 등록
	int don_boardInsert(DonationDto donationDto);


	//도네이션 게시글 수정
	int don_boardUpdate(DonationDto donationDto);

	
	//도네이션 게시글 삭제
	int don_boardDelete(DonationDto donationDto);
}
