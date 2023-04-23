package back.spring.final_back.board.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import back.spring.final_back.payment.repository.WishlistDto;

@Mapper
public interface MarketDao {
     
	//마켓 게시판 게시글 조회
	public List<MarketDto> mk_boardList(MarketDto marketDto);

	//마켓 게시판 게시글 상세보기
	public List<MarketDto> mk_boardDetail(MarketDto marketDto);

	//마켓 게시판 게시글 등록
	public int mk_boardInsert(MarketDto marketDto);

 
	//마켓 게시판 게시글 수정
	public int mk_boardUpdate(MarketDto marketDto);

	
	//마켓 게시판 게시글 삭제
	public int mk_boardDelete(MarketDto marketDto);
    
	//마켓 게시판 게시글 조회수 증가
	public void mk_boardHit(MarketDto marketDto);

	//마켓 게시판 게시글 판매처리
	public int mk_boardSell(MarketDto marketDto);

	
	
	//파일 등록
	public int fileInsert(Map<String, Object> pMap);

	//게시글 찜하기 갯수 증가처리
	public int mk_plusLikes(MarketDto marketDto);

	//게시글 찜하기 갯수 감소처리
	public int mk_minusLikes(MarketDto marketDto);

	//위시리스트 삭제
	public void mk_wishlistDelete(MarketDto marketDto);


	
}
                           