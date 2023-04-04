package back.spring.final_back.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.BoardDao;
import back.spring.final_back.board.repository.MarketDao;
import back.spring.final_back.board.repository.MarketDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {

	private final MarketDao marketDao;

	// 마켓 게시판 조회
	@Override
	public List<MarketDto> mk_boardList() {
		List<MarketDto> mList = marketDao.mk_boardList();
		return mList;
	}

	// 마켓 게시판 게시글 등록
	@Override
	public int mk_boardInsert(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardInsert(marketDto);
		return result;
	}

	// 마켓 게시판 게시글 수정
	@Override
	public int mk_boardUpdate(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardUpdate(marketDto);
		return result;
	}

	//마켓 게시판 게시글 삭제
	@Override
	public int mk_boardDelete(MarketDto marketDto) {
		int result = 0;
		result = marketDao.mk_boardDelete(marketDto);
		return result;
	}

}
