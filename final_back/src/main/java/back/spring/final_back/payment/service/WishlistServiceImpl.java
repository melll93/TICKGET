package back.spring.final_back.payment.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.payment.controller.WishlistController;
import back.spring.final_back.payment.repository.WishlistDao;
import back.spring.final_back.payment.repository.WishlistDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
	Logger logger = LoggerFactory.getLogger(WishlistServiceImpl.class);
	private final WishlistDao wlDao;
	
	@Override
	public List<WishlistDto> wishlistSelect(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistSelect 호출");
		List<WishlistDto>wList = null;
		wList = wlDao.wishlistSelect(wlDto);
		return wList;
	}
	
	@Override
	public List<WishlistDto> wishlistDetail(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistDetail 호출");
		List<WishlistDto>wList = null;
		wList = wlDao.wishlistDetail(wlDto);
		return wList;
	}

	

	@Override
	public int wishlistAdd(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistAdd 호출");
		int result = 0;
		result = wlDao.wishlistAdd(wlDto);
		return result;
	}
	
	
	@Override
	public int wishlistDelete(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistDelete 호출");
		int result = 0;
		result = wlDao.wishlistDelete(wlDto);
		return result;
	}


}
