package back.spring.final_back.payment.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WishlistDao {

	public List<WishlistDto> wishlistSelect(WishlistDto wlDto);

	public List<WishlistDto> wishlistDetail(WishlistDto wlDto);

	
	public int wishlistAdd(WishlistDto wlDto);

	//전체삭제
	public int wishlistDelete(WishlistDto wlDto);

	//선택삭제
	public int wishlistSelDelete(WishlistDto wlDto);


}
