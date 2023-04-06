package back.spring.final_back.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MarketDao {
     
	//마켓 게시판 게시글 조회
	public List<MarketDto> mk_boardList();

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
	
}
                           