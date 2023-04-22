package back.spring.final_back.payment.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WishlistDao {

	public List<WishlistDto> wishlistSelect(WishlistDto wlDto);

	public int wishlistAdd(WishlistDto wlDto);

	public int wishlistDelete(WishlistDto wlDto);

}
