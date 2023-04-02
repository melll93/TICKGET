package back.spring.final_back.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.BoardDao;
import back.spring.final_back.board.repository.DonationDao;
import back.spring.final_back.board.repository.DonationDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

	private final DonationDao donationDao;
	
	//도네이션 게시판 조회
	@Override
	public List<DonationDto> don_boardList() {
		List<DonationDto> dList = donationDao.don_boardList();
		return dList;
	}

	//도네이션 게시판 게시글 등록
	@Override
	public int don_boardInsert(DonationDto donationDto) {
		int result = donationDao.don_boardInsert(donationDto);
		return result;
	}
	
	//도네이션 게시판 게시글 수정
	@Override
	public int don_boardUpdate(DonationDto donationDto) {
		int result = donationDao.don_boardUpdate(donationDto);
		return result;
	}

	@Override
	public int don_boardDelete(DonationDto donationDto) {
		int result = donationDao.don_boardDelete(donationDto);
		return result;
	}

}
