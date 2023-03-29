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
	public List<DonationDto> selectDonationList() {
		List<DonationDto> dList = donationDao.selectDonationList();
		return dList;
	}

	//도네이션 게시판 게시글 등록
	@Override
	public int insertDonationList(DonationDto donationDto) {
		int result = donationDao.insertDonationList(donationDto);
		return result;
	}
	
	//도네이션 게시판 게시글 수정
	@Override
	public int updateDonationList(DonationDto donationDto) {
		int result = donationDao.updateDonationList(donationDto);
		return result;
	}

	@Override
	public int deleteDonationList(DonationDto donationDto) {
		int result = donationDao.deleteDonationList(donationDto);
		return result;
	}

}
