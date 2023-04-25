package back.spring.final_back.payment.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.payment.repository.WishlistDto;
import back.spring.final_back.payment.service.WishlistService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/wishlist/*")
@RequiredArgsConstructor
public class WishlistController {
	Logger logger = LoggerFactory.getLogger(WishlistController.class);
	private final WishlistService wlService;
	
	
	//위시리스트 조회
	@GetMapping("/wishlistSelect")
	public List<WishlistDto> wishlistSelect(WishlistDto wlDto){
		logger.info("WishlistController : wishlistSelect 호출");
		List<WishlistDto>wList = null;
		wList = wlService.wishlistSelect(wlDto);
		return wList;
	}
	
	//위시리스트 상세정보
	@GetMapping("/wishlistDetail")
	public List<WishlistDto> wishlistDetail(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistDetail 호출");
		List<WishlistDto>wList = null;
		wList = wlService.wishlistDetail(wlDto);
		return wList;
	}
	

	//위시리스트 추가
	@PostMapping("/wishlistAdd")
	public int wishlistAdd(@RequestBody WishlistDto wlDto) {
		logger.info("WishlistController : wishlistAdd 호출");
	     int result = 0;
	     result = wlService.wishlistAdd(wlDto);
	     return result;
	}
	
	
	//위시리스트 전체삭제
	@GetMapping("/wishlistDelete")
	public int wishlistDelete(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistDelete 호출");
	     int result = 0;
	     result = wlService.wishlistDelete(wlDto);
	     return result;
	}
	
	//위시리스트 선택삭제
	@GetMapping("/wishlistSelDelete")
	public int wishlistSelDelete(WishlistDto wlDto) {
		logger.info("WishlistController : wishlistSelDelete 호출");
		int result = 0;
		result = wlService.wishlistSelDelete(wlDto);
		return result;
	}
}
