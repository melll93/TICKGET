package back.spring.final_back.board.service;

import java.util.List;

import back.spring.final_back.board.repository.DonationDto;


public interface DonationService {

	//도네이션 게시판 조회
	List<DonationDto> selectDonationList();


    //도네이션 게시글 등록
	int insertDonationList(DonationDto donationDto);


	//도네이션 게시글 수정
	int updateDonationList(DonationDto donationDto);

	
	//도네이션 게시글 삭제
	int deleteDonationList(DonationDto donationDto);
}
