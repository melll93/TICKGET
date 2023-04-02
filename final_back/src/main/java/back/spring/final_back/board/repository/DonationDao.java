package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DonationDao {
     
	//도네이션 게시판 게시글 조회
	public List<DonationDto> don_boardList();

	//도네이션 게시판 게시글 등록
	public int don_boardInsert(DonationDto donationDto);

 
	//도네이션 게시판 게시글 수정
	public int don_boardUpdate(DonationDto donationDto);

	
	//도네이션 게시판 게시글 삭제
	public int don_boardDelete(DonationDto donationDto);
}
