package back.spring.final_back.payment.service;

import java.util.List;

import back.spring.final_back.payment.repository.WishlistDto;

public interface WishlistService {

	//위시리스트 조회
	public List<WishlistDto> wishlistSelect(WishlistDto wlDto);

	//위시리스트 상세정보
	public List<WishlistDto> wishlistDetail(WishlistDto wlDto);

	//위시리스트 추가
	public int wishlistAdd(WishlistDto wlDto);

	//위시리스트 전체삭제
	public int wishlistDelete(WishlistDto wlDto);

	//위시리스트 선택삭제
	public int wishlistSelDelete(WishlistDto wlDto);
    
	//위시리스트 판매여부 업데이트
	public int wishlistUpdateStatus(WishlistDto wlDto);


}
